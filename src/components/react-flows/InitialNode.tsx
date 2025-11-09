"use client"
// plus icon, NodeProps
import { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo, useState } from "react"
import { PlaceholderNode } from "./placeholder-node"
import { WorkflowNode } from "./WorkflowNode"
import NodeSelector from "./NodeSelector"
import { useAtom } from "jotai"
import { nodeSelectorAtom } from "@/atoms/stateAtoms"

const InitialNode = memo((props: NodeProps) => {
  const [open, setOpen] = useAtom(nodeSelectorAtom)
  return (
    <NodeSelector open={open} onOpenChange={setOpen}>
      <WorkflowNode name="Initial Node" showToolbar>
        <PlaceholderNode {...props} onClick={() => setOpen(true)}>
          <div className="flex flex-col items-center justify-center gap-y-2 cursor-pointer ">
            <PlusIcon className="size-4" />
          </div>
        </PlaceholderNode>
      </WorkflowNode>
    </NodeSelector>
  )
})

InitialNode.displayName = "InitialNode"
export default InitialNode
