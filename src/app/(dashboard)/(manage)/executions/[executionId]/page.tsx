import { requireAuth } from "@/modules/auth/helpers/requireAuth"
import { ExecutionDetailPageView } from "@/modules/executions"

type Props = {
  params: Promise<{ executionId: string }>
}

export default async function ExecutionIdPage(props: Props) {
  await requireAuth()
  const { executionId } = await props.params
  return <ExecutionDetailPageView executionId={executionId} />
}
