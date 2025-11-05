import { requireAuth } from "@/modules/auth/helpers/requireAuth"
import WorkflowsList, {
  WorkflowsContainer,
} from "@/modules/workflows/components/workflows"
import { HydrateClient } from "@/trpc/server"
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import type { SearchParams } from "nuqs/server"
import { workFlowParamsLoader } from "@/modules/workflows/server/paramsLoader"
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
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  )
}
