import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db, user, workflows } from "@/lib/db";
import { eq } from "drizzle-orm";
import { EVENTS } from "@/inngest/events";
import { inngest } from "@/inngest/client";
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await db.query.user.findMany({
      where: eq(user.id, ctx.auth.user.id),
    });
    return { data: users };
  }),

  // fake simulation of workflow
  createWorkflow: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // send event to inngest
      await inngest.send({
        name: EVENTS.CREATE_WORKFLOW,
        data: input,
      });

      await db.insert(workflows).values({
        name: input.name,
        description: input.description,
        // userId: ctx.auth.user.id,
      });

      return { data: "Workflow created successfully" };
    }),

  getWorkflows: protectedProcedure.query(async ({ ctx }) => {
    const workflowsData = await db.query.workflows.findMany();
    return { data: workflowsData };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
