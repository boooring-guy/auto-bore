import { Editor } from "@/modules/editor/components/Editor"
import React from "react"
import EdtiorHeader from "../components/EdtiorHeader"

type WorkflowIdPageProps = {
  workflowId: string
}

export function WorkflowIdPageView({ workflowId }: WorkflowIdPageProps) {
  return (
    <>
      <EdtiorHeader workflowId={workflowId} />
      <main className="h-full w-full">
        <Editor workflowId={workflowId} />
      </main>
    </>
  )
}
