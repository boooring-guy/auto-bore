import { db } from "@/lib/db"
import { nodes, workflows, connections } from "@/lib/db/schema"
import { NodeType } from "@/lib/db/NodeType"
import type { Node, Edge, Position } from "@xyflow/react"
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init"
import { z } from "zod"
import { generateSlug } from "random-word-slugs"
import { and, desc, eq, ilike } from "drizzle-orm"
import { TRPCError } from "@trpc/server"
import { PAGINATION } from "@/config/constants"

export const workflowsRouter = createTRPCRouter({
  // Create a new workflow (Premium feature)
  create: premiumProcedure
    .input(
      z.object({
        name: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const completeWorkflow = await db.transaction(async (tx) => {
        // this tx inculudes a workflow, a node, and a connection
        // 1. Create a workflow
        const [newWorkflow] = await tx
          .insert(workflows)
          .values({
            name: input.name || generateSlug(3),
            description: input.description,
            userId: ctx.auth.user.id,
          })
          .returning()
        // 2. Create a node
        const newNodes = await tx
          .insert(nodes)
          .values([
            {
              workflowId: newWorkflow.id,
              name: "Initial Node",
              position: {
                x: 0,
                y: 0,
              },
              type: NodeType.INITIAL,
              data: {},
            },
          ])
          .returning({
            id: nodes.id,
            position: nodes.position,
            data: nodes.data,
            type: nodes.type,
            workflowId: nodes.workflowId,
          })
        return newWorkflow
      })

      return { data: completeWorkflow }
    }),

  // Get all workflows for the authenticated user
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().optional().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .optional()
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().optional().default(PAGINATION.DEFAULT_SEARCH),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input
      const [wflows, totalCount] = await Promise.all([
        db.query.workflows.findMany({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          where: and(
            eq(workflows.userId, ctx.auth.user.id),
            ilike(workflows.name, `%${search}%`)
          ),
          orderBy: desc(workflows.createdAt),
        }),
        // count total number of workflows
        db.$count(
          workflows,
          and(
            eq(workflows.userId, ctx.auth.user.id),
            ilike(workflows.name, `%${search}%`)
          )
        ),
      ])
      const totalPages = Math.ceil(totalCount / pageSize)
      const hasNextPage = page < totalPages
      const hasPreviousPage = page > 1

      return {
        data: wflows, // TODO: map to respective NODE
        meta: {
          totalCount,
          page,
          pageSize,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      }
    }),

  // Get a single workflow by ID
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const workflow = await db.query.workflows.findFirst({
        where: and(
          eq(workflows.id, input.id),
          eq(workflows.userId, ctx.auth.user.id)
        ),
        with: {
          nodes: true,
        },
      })

      if (!workflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        })
      }

      const reactFlowNodes: Node[] =
        workflow?.nodes?.map((node) => {
          return {
            id: node.id,
            type: node.type,
            position: node.position as { x: number; y: number },
            data: (node.data as Record<string, unknown>) || {},
          }
        }) || []

      // Query connections separately to handle case where table might not exist
      let reactFlowConnections: Edge[] = []
      try {
        const workflowConnections = await db.query.connections.findMany({
          where: eq(connections.workflowId, workflow.id),
        })
        reactFlowConnections = workflowConnections.map((connection) => {
          return {
            id: connection.id,
            source: connection.fromNodeId,
            target: connection.toNodeId,
            sourceHandle: connection.fromOutput,
            targetHandle: connection.toInput,
          }
        })
      } catch (error) {
        // If connections table doesn't exist or query fails, return empty array
        reactFlowConnections = []
      }

      return {
        ...workflow,
        nodes: reactFlowNodes,
        connections: reactFlowConnections,
      }
    }),

  // Update Functionality for Workflow
  // Update a workflow's name and description
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        edges: z.array(
          z.object({
            source: z.string(),
            target: z.string(),
            sourceHandle: z.string().nullish(),
            targetHandle: z.string().nullish(),
          })
        ),
        nodes: z.array(
          z.object({
            id: z.string(),
            position: z.object({
              x: z.number(),
              y: z.number(),
            }),
            type: z.string().nullish(),
            data: z.record(z.string(), z.any()).optional(),
            name: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // update the workflow nodes and edges
      const { nodes: nodesInput, edges: edgesInput } = input
      try {
        const workflow = await db.query.workflows.findFirst({
          where: and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          ),
        })
        if (!workflow) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Workflow not found",
          })
        }

        // Transaction to update the workflow nodes and edges
        const updateWorkflowTx = await db.transaction(async (TX) => {
          // 1. Delete all existing nodes and edges (it will cascade delete the connections)
          await TX.delete(nodes).where(eq(nodes.workflowId, workflow.id))

          // 2. Create new nodes
          // Valid database enum values (subset of NodeType)
          // To make database compatible, we need to convert the type to a valid database NodeType
          const validNodeTypes = [
            NodeType.INITIAL,
            NodeType.MANUAL_TRIGGER,
            NodeType.HTTP_REQUEST,
            NodeType.ACTION,
            NodeType.CONDITION,
            NodeType.LOOP,
          ] as const

          // Only insert nodes if there are any to insert
          let insertedNodeIds: Set<string> = new Set()
          if (nodesInput.length > 0) {
            const newNodes = await TX.insert(nodes)
              .values(
                nodesInput.map((eachNode) => {
                  // Validate and convert type to a valid database NodeType
                  const nodeType =
                    eachNode.type &&
                    validNodeTypes.includes(
                      eachNode.type as (typeof validNodeTypes)[number]
                    )
                      ? (eachNode.type as (typeof validNodeTypes)[number])
                      : NodeType.INITIAL

                  return {
                    id: eachNode.id,
                    workflowId: workflow.id,
                    position: eachNode.position as { x: number; y: number },
                    type: nodeType,
                    data: eachNode.data || {},
                    name: eachNode.name || "unknown",
                  }
                })
              )
              .returning()
            insertedNodeIds = new Set(newNodes.map((node) => node.id))
          }

          // 3. Create new edges/connections
          // Only insert edges if there are nodes and edges to connect
          // Filter out edges that reference non-existent nodes
          if (edgesInput.length > 0 && insertedNodeIds.size > 0) {
            const validEdges = edgesInput.filter(
              (edge) =>
                insertedNodeIds.has(edge.source) &&
                insertedNodeIds.has(edge.target)
            )

            if (validEdges.length > 0) {
              // Then insert the edges
              await TX.insert(connections).values(
                validEdges.map((eachEdge) => ({
                  workflowId: workflow.id,
                  fromNodeId: eachEdge.source,
                  toNodeId: eachEdge.target,
                  fromOutput: eachEdge.sourceHandle || "",
                  toInput: eachEdge.targetHandle || "",
                }))
              )
            }
          }

          // 4. Finally update the timestamps
          await TX.update(workflows)
            .set({
              updatedAt: new Date(),
            })
            .where(eq(workflows.id, workflow.id))

          return { workflow: workflow }
        })

        return updateWorkflowTx
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update workflow",
          cause: error,
        })
      }
    }),
  // --

  // Update a workflow's name and description
  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedWorkflow] = await db
        .update(workflows)
        .set({ name: input.name })
        .where(
          and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          )
        )
        .returning()
      return { data: updatedWorkflow }
    }),

  // Delete a workflow by ID
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if the workflow exists
      const workflow = await db.query.workflows.findFirst({
        where: and(
          eq(workflows.id, input.id),
          eq(workflows.userId, ctx.auth.user.id)
        ),
      })
      if (!workflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        })
      }

      // delete the workflow
      await db
        .delete(workflows)
        .where(
          and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          )
        )
      return { data: workflow } // return the id of the workflow that was removed
    }),
})
