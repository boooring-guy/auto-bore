/**
 * Hook to get the workflows for a user using suspense queries (prefetched and cached)
 *  */
import { useTRPC } from "@/trpc/client"
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useWorkflowsParams } from "./useWorkflowsParams"

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC()
  const [params] = useWorkflowsParams()
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}

export const useCreateWorkflow = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: ({ data }) => {
        toast.success(`Workflow ${data.name} created successfully`)
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
      },
      onError: (error) => {
        toast.error("Failed to create workflow", {
          description: error.message,
        })
      },
    })
  )
}
