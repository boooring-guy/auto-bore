"use client"

import { NodeType } from "@/lib/db/NodeType"
import {
  Globe2Icon,
  LucideIcon,
  MousePointer2Icon,
  SquareMousePointerIcon,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Separator } from "../ui/separator"
import { cn, generateId } from "@/lib/utils"
import { useReactFlow } from "@xyflow/react"
import { toast } from "sonner"
import { useCallback } from "react"

export type NodeTypeOption = {
  label: string
  type: NodeType
  description: string
  icon: React.ComponentType<{ className?: string }> | LucideIcon | string
}

const triggerNodes: NodeTypeOption[] = [
  {
    label: "Manual Trigger",
    type: NodeType.MANUAL_TRIGGER,
    description: "Trigger the workflow manually by clicking the node.",
    icon: MousePointer2Icon,
  },
]

const executionNodes: NodeTypeOption[] = [
  {
    label: "HTTP Request",
    type: NodeType.HTTP_REQUEST,
    description: "Make an HTTP request to an external API.",
    icon: Globe2Icon,
  },
]

interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export default function NodeSelector({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) {
  const { getNodes, setNodes, screenToFlowPosition } = useReactFlow()

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      // check for manual trigger
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const allNodes = getNodes()
        const hasManualTrigger = allNodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        )
        if (hasManualTrigger) {
          toast.error("Only one manual trigger node is allowed per workflow")
          return
        }
        setNodes((snapshot) => {
          const hasInitialnode = snapshot.some(
            (node) => node.type === NodeType.INITIAL
          )
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
          const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
          })
          const newNode = {
            id: generateId("nodes"),
            type: selection.type,
            position: flowPosition,
            data: {},
            name: selection.label,
          }

          if (hasInitialnode) {
            return [newNode]
          }
          return [...snapshot, newNode]
        })
        // close the selector
        onOpenChange(false)
        return
      }
      // check for http request
      if (selection.type === NodeType.HTTP_REQUEST) {
        setNodes((snapshot) => {
          const centerX = window.innerWidth / 2
          const centerY = window.innerHeight / 2
          const flowPosition = screenToFlowPosition({
            x: centerX + (Math.random() - 0.5) * 200,
            y: centerY + (Math.random() - 0.5) * 200,
          })
          const newNode = {
            id: generateId("nodes"),
            type: selection.type,
            position: flowPosition,
            data: {
              method: "GET" as const,
            },
            name: selection.label,
          }
          return [...snapshot, newNode]
        })
        // close the selector
        onOpenChange(false)
      }
    },
    [getNodes, setNodes, screenToFlowPosition, onOpenChange]
  )

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm max-w-md overflow-y-auto"
      >
        <SheetHeader className="p-4">
          <SheetTitle className="text-base font-medium space-y-4">
            <SquareMousePointerIcon className="size-8" />
            <span>Add a new node</span>
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Select a node type to add to the flow.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-1">
          {triggerNodes.length > 0 && (
            <>
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Triggers
                </p>
              </div>
              {triggerNodes.map((node) => {
                const Icon = node.icon as React.ComponentType<{
                  className?: string
                }>
                return (
                  <NodeOption
                    key={node.type}
                    node={node}
                    Icon={Icon}
                    onClick={() => handleNodeSelect(node)}
                  />
                )
              })}
            </>
          )}
          {executionNodes.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="px-3 py-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </p>
              </div>
              {executionNodes.map((node) => {
                const Icon = node.icon as React.ComponentType<{
                  className?: string
                }>
                return (
                  <NodeOption
                    key={node.type}
                    node={node}
                    Icon={Icon}
                    onClick={() => handleNodeSelect(node)}
                  />
                )
              })}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface NodeOptionProps {
  node: NodeTypeOption
  Icon: React.ComponentType<{ className?: string }> | string
  onClick: () => void
}

function NodeOption({ node, Icon, onClick }: NodeOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full flex items-start gap-3 px-3 py-2.5 rounded-md",
        "transition-all duration-150 ease-out",
        "hover:bg-accent/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5",
        "before:bg-primary before:opacity-0 before:transition-opacity before:duration-150",
        "hover:before:opacity-100"
      )}
    >
      <div className="mt-0.5 shrink-0">
        {typeof Icon === "string" ? (
          <img
            src={Icon}
            alt={node.label}
            className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
          />
        ) : (
          <Icon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="text-sm font-medium text-foreground leading-tight">
          {node.label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {node.description}
        </p>
      </div>
    </button>
  )
}
