import { getSession } from "@/lib/auth-helpers";
import { polarClientInstance } from "@/lib/polar";
import { initTRPC, TRPCError } from "@trpc/server";
import { cache } from "react";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});

const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

/**
 * Protected procedure
 * @param opts.next - The next procedure to call
 * @returns The result of the next procedure
 * @throws {TRPCError} If the user is not authenticated
 */

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await getSession();
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      cause: "Failure of authentication check",
    });
  }
  return next({ ctx: { ...ctx, auth: session } });
});

export const premiumProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const customer = await polarClientInstance.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });
    if (
      !customer?.activeSubscriptions ||
      customer.activeSubscriptions.length === 0
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You need to be a premium user to access this resource",
        cause: "Failure of premium check",
      });
    }
    return next({ ctx: { ...ctx, customer } });
  }
);
