"use client"
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
} from "@/components/entites"
import { useSuspenseWorkflows } from "../hooks/useWorkflows"
import { useCreateWorkflow } from "../hooks/useWorkflows"
import { useRouter } from "next/navigation"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useWorkflowsParams } from "../hooks/useWorkflowsParams"
import { useEntitySearch } from "@/hooks/useEntitySearch"
const WorkflowsList = () => {
  const { data: workflows } = useSuspenseWorkflows()
  return <pre>{JSON.stringify(workflows, null, 2)}</pre>
}

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams()
  const { onSearchChange, searchValue } = useEntitySearch({ params, setParams })
  return (
    <EntitySearch
      placeholder="Search workflows"
      value={searchValue}
      onChange={onSearchChange}
    />
  )
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

export const WorkflowsPagination = () => {
  const { data: workflows } = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowsParams()
  const { meta } = workflows
  return (
    <EntityPagination
      page={params.page}
      totalPages={meta.totalPages}
      onPageChange={(page) => setParams({ ...params, page })} // locking other params except page
    />
  )
}

export const WorkflowsContainer = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader disabled={false} />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
}
