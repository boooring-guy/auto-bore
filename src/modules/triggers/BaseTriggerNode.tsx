"use client"
import Image from "next/image"
import { BaseNode, BaseNodeContent } from "@/components/react-flows/base-node"
import { memo, type ReactNode, useCallback } from "react"
import { BaseHandle } from "@/components/react-flows/base-handle"
import { WorkflowNode } from "@/components/react-flows/WorkflowNode"
import { NodeProps, Position, useReactFlow } from "@xyflow/react"
import { LucideIcon } from "lucide-react"
import { toast } from "sonner"
import { useAtomValue } from "jotai"
import { editorReactFlowAtom } from "@/atoms/stateAtoms"
import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flows/node-status-indicator"

interface BaseTriggerNodeProps extends NodeProps {
  id: string
  icon: LucideIcon | string
  name: string
  description?: string
  children?: ReactNode
  onSettings?: () => void
  onDoubleClick?: () => void
  status?: NodeStatus
}

export const BaseTriggerNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    status = "initial",
    onSettings,
    onDoubleClick,
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow()
    // TODO: Add delete and settings functionality
    const handleDelete = useCallback(() => {
      console.log("handleDelete called", {
        id,
        name,
      })
      // remove the node from the react flow
      setNodes((current) => current.filter((node) => node.id !== id))
      // remove the edges from the react flow
      setEdges((current) =>
        current.filter((edge) => edge.source !== id && edge.target !== id)
      )
    }, [id, name])
    const handleSettings = useCallback(() => {}, [])

    return (
      <WorkflowNode
        name={name}
        description={description}
        onSettings={onSettings}
        onDelete={handleDelete}
        showToolbar={true}
      >
        {/* TODO: Wrap NodeStatus Indicator */}
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l-2xl "
        >
          <BaseNode
            status={status}
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
        </NodeStatusIndicator>
      </WorkflowNode>
    )
  }
)

BaseTriggerNode.displayName = "BaseTriggerNode"
