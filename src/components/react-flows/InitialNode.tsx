"use client"
// plus icon, NodeProps
import { NodeProps } from "@xyflow/react"
import { PlusIcon } from "lucide-react"
import { memo } from "react"
import { PlaceholderNode } from "./placeholder-node"
import { WorkflowNode } from "./WorkflowNode"

const InitialNode = memo((props: NodeProps) => {
  return (
    <WorkflowNode name="Initial Node" showToolbar>
      <PlaceholderNode {...props}>
        <div className="flex flex-col items-center justify-center gap-y-2 cursor-pointer ">
          <PlusIcon className="size-4" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  )
})

InitialNode.displayName = "InitialNode"
export default InitialNode
