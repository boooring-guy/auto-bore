"use client"
import {
  EntityContainer,
  EntityHeader,
  EntityPagination,
  EntitySearch,
  EntityLoadingView,
  EntityErrorView,
  EntityEmptyView,
  EntityItem,
} from "@/components/entites"
import { formatDistanceToNow } from "date-fns"
import { useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/useWorkflows"
import { useCreateWorkflow } from "../hooks/useWorkflows"
import { useRouter } from "next/navigation"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useWorkflowsParams } from "../hooks/useWorkflowsParams"
import { useEntitySearch } from "@/hooks/useEntitySearch"
import { EntityListView } from "@/components/entites/EntityList"
import { GitBranchIcon } from "lucide-react"
import { Workflow } from "@/lib/db"

export const WorkflowItem = ({
  workflow,
}: {
  workflow: Workflow /* fixed  type-error from superjson */
}) => {
  const removeWorkflow = useRemoveWorkflow()
  const handleRemoveWorkflow = () => {
    removeWorkflow.mutateAsync({ id: workflow.id })
  }
  return (
    <EntityItem
      item={workflow}
      href={`/workflows/${workflow.id}`}
      title={workflow.name}
      onRemove={handleRemoveWorkflow}
      isRemoving={removeWorkflow.isPending}
      subtitle={
        <div className="text-xs mt-1 text-muted-foreground">
          Updated{" "}
          {formatDistanceToNow(workflow.updatedAt, {
            addSuffix: true,
          })}{" "}
          ago &bull; Created{" "}
          {formatDistanceToNow(workflow.createdAt, {
            addSuffix: true,
          })}{" "}
          ago
        </div>
      }
      image={
        <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
          <GitBranchIcon className="size-5" />
        </div>
      }
    />
  )
}

const WorkflowsList = () => {
  const { data: workflows } = useSuspenseWorkflows()

  console.log(workflows.data.length, "workflows.data.length")

  if (workflows.data.length === 0) {
    console.log("returning empty")
    return <WorkflowsEmpty />
  }
  return (
    <EntityListView
      items={workflows.data}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => (
        <WorkflowItem key={workflow.id} workflow={workflow} />
      )}
      emptyView={<WorkflowsEmpty />}
    />
  )
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

export const WorkflowsLoading = () => {
  return <EntityLoadingView message="Loading workflows..." entity="workflows" />
}

export const WorkflowsError = ({ error }: { error: Error }) => {
  return (
    <EntityErrorView
      entity="workflows"
      message={error.message}
      error={error}
      title="Failed to load workflows"
      description="We couldn't load your workflows. Please try again later."
    />
  )
}

interface WorkflowsEmptyProps {}

export const WorkflowsEmpty = ({}: WorkflowsEmptyProps) => {
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
      <EntityEmptyView
        message="No workflows found"
        entity="workflows"
        onNew={handleCreateNewWorkflow}
      />
    </>
  )
}
