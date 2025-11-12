"use client"
import Image from "next/image"
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
  BaseNodeFooter,
} from "../../../components/react-flows/base-node"
import { HTMLAttributes, forwardRef } from "react"
import { memo, type ReactNode, useCallback } from "react"
import { BaseHandle } from "../../../components/react-flows/base-handle"
import { WorkflowNode } from "../../../components/react-flows/WorkflowNode"
import { NodeProps, Position, useReactFlow } from "@xyflow/react"
import { LucideIcon } from "lucide-react"
import {
  NodeStatus,
  NodeStatusIndicator,
} from "@/components/react-flows/node-status-indicator"

interface BaseExecutionNodeProps extends NodeProps {
  id: string
  icon: LucideIcon | string
  name: string
  description?: string
  children?: ReactNode
  onSettings?: () => void
  onDoubleClick?: () => void
  status?: NodeStatus
}

export const BaseExecutionNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
    status = "loading",
  }: BaseExecutionNodeProps) => {
    // TODO: Add delete and settings functionality
    const { setNodes, setEdges } = useReactFlow()

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
    }, [id, setNodes, setEdges])
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
        <NodeStatusIndicator status={status} variant="border">
          <BaseNode status={status} onDoubleClick={onDoubleClick}>
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
              {children}
              <BaseHandle
                id={"target-1"}
                type="target"
                position={Position.Left}
              />
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

BaseExecutionNode.displayName = "BaseExecutionNode"
