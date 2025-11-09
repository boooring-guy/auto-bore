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
import React from "react"
import { toast } from "sonner"
import { useWorkflowsParams } from "./useWorkflowsParams"
import { Trash2Icon } from "lucide-react"

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

// Remove Workflow
export const useRemoveWorkflow = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: ({ data: workflow }) => {
        toast.warning(`Workflow ${workflow.name} removed successfully`, {
          icon: React.createElement(Trash2Icon, { className: "size-4" }),
        })
        // invalidate the workflow that was removed
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
      },
      onError: (error) => {
        toast.error("Failed to remove workflow", {
          description: error.message,
        })
      },
    })
  )
}
