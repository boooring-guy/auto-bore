import { MousePointer2Icon } from "lucide-react"
import { BaseTriggerNode } from "../../BaseTriggerNode"
import { NodeProps } from "@xyflow/react"
import { memo } from "react"

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <BaseTriggerNode
      icon={MousePointer2Icon}
      name="Manual Trigger"
      description="Trigger the workflow manually by clicking the node."
      // status={nodeStatus}
      onDoubleClick={() => {
        console.log("Manual trigger node double clicked")
      }}
      onSettings={() => {
        console.log("Manual trigger node settings clicked")
      }}
      {...props}
    />
  )
})

ManualTriggerNode.displayName = "ManualTriggerNode"
