import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db, user } from "@/lib/db";
import { eq } from "drizzle-orm";
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await db.query.user.findMany({
      where: eq(user.id, ctx.auth.user.id),
    });
    return { data: users };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
