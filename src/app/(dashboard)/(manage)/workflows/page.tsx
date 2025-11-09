import { requireAuth } from "@/modules/auth/helpers/requireAuth"
import WorkflowsList, {
  WorkflowsContainer,
  WorkflowsLoading,
  WorkflowsError,
} from "@/modules/triggers/components/workflows/components/workflows"
import { HydrateClient } from "@/trpc/server"
import { prefetchWorkflows } from "@/modules/triggers/components/workflows/server/prefetch"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import type { SearchParams } from "nuqs/server"
import { workFlowParamsLoader } from "@/modules/triggers/components/workflows/server/paramsLoader"
type Props = {
  searchParams: Promise<SearchParams>
}

export default async function WorkflowsPage({ searchParams }: Props) {
  await requireAuth()
  const params = await workFlowParamsLoader(searchParams)
  await prefetchWorkflows(params)

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary
          fallback={
            <WorkflowsError error={new Error("Sorry, something went wrong")} />
          }
        >
          <Suspense fallback={<WorkflowsLoading />}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}
