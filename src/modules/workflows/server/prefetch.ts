import { prefetch } from "@/trpc/server";
import { trpc } from "@/trpc/server";

export const prefetchWorkflows = async () => {
  return prefetch(trpc.workflows.getMany.queryOptions());
};
