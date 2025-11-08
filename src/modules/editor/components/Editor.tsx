"use client"
import { useSuspenseWorkflow } from "@/modules/workflows/hooks/useWorkflow"

type Props = {
  workflowId: string
}

export function Editor({ workflowId }: Props) {
  const { data: workflow } = useSuspenseWorkflow(workflowId)
  return <div>Editor: {workflow?.data.name}</div>
}
