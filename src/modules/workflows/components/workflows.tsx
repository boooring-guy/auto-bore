"use client"

import { EntityContainer, EntityHeader } from "@/components/entity-components"
import { useSuspenseWorkflows } from "../hooks/useWorkflows"
import { useCreateWorkflow } from "../hooks/useWorkflows"
import { sentryLog } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
const WorkflowsList = () => {
  const { data: workflows } = useSuspenseWorkflows()
  return <pre>{JSON.stringify(workflows, null, 2)}</pre>
}
export const WorkflowsHeader = ({ disabled }: { disabled: boolean }) => {
  const router = useRouter()
  const { handleError, modal } = useUpgradeModal()
  const createNewWorkflow = useCreateWorkflow()
  const handleCreateNewWorkflow = () => {
    createNewWorkflow.mutate(
      {},
      {
        onSuccess: ({ data }) => {
          router.push(`/workflows/${data.id}`)
        },
        onError: (error) => {
          handleError(error)
        },
      }
    )
  }
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Manage your workflows"
        disabled={disabled}
        onNew={handleCreateNewWorkflow}
        newButtonLabel="New Workflow"
        isCreating={createNewWorkflow.isPending}
      />
    </>
  )
}
export default WorkflowsList

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader disabled={false} />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  )
}
