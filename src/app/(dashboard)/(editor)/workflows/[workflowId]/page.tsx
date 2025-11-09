import { requireAuth } from "@/modules/auth/helpers/requireAuth"
import { prefetchWorkflow } from "@/modules/triggers/components/workflows/server/prefetch"
import { WorkflowIdPageView } from "@/modules/editor/views/WorkflowIdPageView"
import { HydrateClient } from "@/trpc/server"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import { EditorError, EditorLoading } from "@/modules/editor/components/states"

type Props = {
  params: Promise<{ workflowId: string }>
}

export default async function WorkflowIdPage(props: Props) {
  await requireAuth()
  const { workflowId } = await props.params
  prefetchWorkflow(workflowId)
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError message="Error loading editor" />}>
        <Suspense fallback={<EditorLoading message="Loading editor..." />}>
          <WorkflowIdPageView workflowId={workflowId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
