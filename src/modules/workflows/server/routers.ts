import { db } from "@/lib/db"
import { workflows } from "@/lib/db/schema"
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init"
import { z } from "zod"
import { generateSlug } from "random-word-slugs"
import { and, desc, eq, ilike, like } from "drizzle-orm"
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
