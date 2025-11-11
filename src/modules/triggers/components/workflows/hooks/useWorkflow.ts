import { useTRPC } from "@/trpc/client"
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { toast } from "sonner"

export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC()
  return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id: id }))
}

// TODO: Create a hook to update a workflow - name
export const useUpdateWorkflowName = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  return useMutation(
    trpc.workflows.updateName.mutationOptions({
      onSuccess: ({ data }) => {
        toast.success(`Workflow ${data.name} updated successfully`)
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: data.id })
        )
      },
      onError: (error) => {
        toast.error("Failed to update workflow", {
          description: error.message,
        })
      },
    })
  )
}

// TODO: Create a hook to update a workflow - name
export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  return useMutation(
    trpc.workflows.update.mutationOptions({
      onSuccess: ({ workflow }) => {
        toast.success(`Workflow ${workflow.name} saved successfully`)
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}))
        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryOptions({ id: workflow.id })
        )
      },
      onError: (error) => {
        toast.error("Failed to save workflow", {
          description: error.message,
        })
      },
    })
  )
}
