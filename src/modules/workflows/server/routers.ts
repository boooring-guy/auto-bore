import { db } from "@/lib/db"
import { workflows } from "@/lib/db/schema"
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init"
import { z } from "zod"
import { generateSlug } from "random-word-slugs"
import { and, desc, eq } from "drizzle-orm"
import { TRPCError } from "@trpc/server"

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
      const [newWorkflow] = await db
        .insert(workflows)
        .values({
          name: input.name || generateSlug(3),
          description: input.description,
          userId: ctx.auth.user.id,
        })
        .returning()
      return { data: newWorkflow }
    }),

  // Get all workflows for the authenticated user
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const wflows = await db.query.workflows.findMany({
      where: eq(workflows.userId, ctx.auth.user.id),
      orderBy: [desc(workflows.createdAt)],
    })
    return { data: wflows }
    // todo: cursor, pagination and search etc...
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
      })
      if (!workflow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workflow not found",
        })
      }
      return { data: workflow }
    }),

  // Update a workflow's name and description
  updateName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db
        .update(workflows)
        .set({ name: input.name, description: input.description })
        .where(
          and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          )
        )
      return { data: "Workflow name updated successfully" }
    }),

  // Delete a workflow by ID
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await db
        .delete(workflows)
        .where(
          and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          )
        )
      return { data: "Workflow deleted successfully" }
    }),
})
