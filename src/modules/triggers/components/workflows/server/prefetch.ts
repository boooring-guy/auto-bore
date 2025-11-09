import { prefetch } from "@/trpc/server"
import { trpc } from "@/trpc/server"
import { useWorkflowsParams } from "../hooks/useWorkflowsParams"
import { SearchParams } from "nuqs/server"

export const prefetchWorkflows = async (params: {
  page: number
  pageSize: number
  search: string
}) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params))
}

export const prefetchWorkflow = async (id: string) => {
  return prefetch(trpc.workflows.getOne.queryOptions({ id: id }))
}
