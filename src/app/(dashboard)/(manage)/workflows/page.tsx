import { requireAuth } from "@/modules/auth/helpers/requireAuth"
import WorkflowsList, {
  WorkflowsContainer,
} from "@/modules/workflows/components/workflows"
import { HydrateClient } from "@/trpc/server"
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"

export default async function WorkflowsPage() {
  await requireAuth()
  await prefetchWorkflows()
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
