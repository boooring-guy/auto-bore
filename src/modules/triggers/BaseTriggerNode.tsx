"use client"
import Image from "next/image"
import { BaseNode, BaseNodeContent } from "@/components/react-flows/base-node"
import { memo, type ReactNode, useCallback } from "react"
import { BaseHandle } from "@/components/react-flows/base-handle"
import { WorkflowNode } from "@/components/react-flows/WorkflowNode"
import { NodeProps, Position } from "@xyflow/react"
import { LucideIcon } from "lucide-react"

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string
  name: string
  description?: string
  children?: ReactNode
  onSettings?: () => void
  onDoubleClick?: () => void
  // status?: NodeStatus
}

export const BaseTriggerNode = memo(
  ({
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
    // TODO: Add delete and settings functionality
    const handleDelete = useCallback(() => {}, [])
    const handleSettings = useCallback(() => {}, [])
    console.log("This component is rendered", name)
    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
        showToolbar={true}
      >
        {/* TODO: Wrap NodeStatus Indicator */}
        <BaseNode
          onDoubleClick={onDoubleClick}
          className="rounded-l-2xl relative group"
        >
          <BaseNodeContent>
            {typeof Icon === "string" ? (
              <Image src={Icon} alt={name} width={16} height={16} />
            ) : (
              <Icon className="size-4 text-muted-foreground" />
            )}
            {children}

            <BaseHandle
              id={"source-1"}
              type="source"
              position={Position.Right}
            />
          </BaseNodeContent>
        </BaseNode>
      </WorkflowNode>
    )
  }
)

BaseTriggerNode.displayName = "BaseTriggerNode"
