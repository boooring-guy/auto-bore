import { MousePointer2Icon } from "lucide-react"
import { BaseTriggerNode } from "../../BaseTriggerNode"
import { NodeProps } from "@xyflow/react"
import { memo, useState } from "react"
import { ManualTriggerDialog } from "./mt-dialog"

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDoubleClick = () => {
    setDialogOpen(true)
  }
  const handleSettingsClick = () => {
    setDialogOpen(true)
  }
  const nodeStatus = "initial"

  return (
    <>
      <ManualTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        icon={MousePointer2Icon}
        name="Manual Trigger"
        description="Trigger the workflow manually by clicking the node."
        status={nodeStatus}
        onDoubleClick={handleDoubleClick}
        onSettings={handleSettingsClick}
        {...props}
      />
    </>
  )
})

ManualTriggerNode.displayName = "ManualTriggerNode"
