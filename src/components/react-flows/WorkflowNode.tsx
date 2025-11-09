import { Button } from "@/components/ui/button"
import { NodeToolbar, Position } from "@xyflow/react"
import { SettingsIcon, TrashIcon } from "lucide-react"

interface WorkflowNodesProps {
  children: React.ReactNode
  showToolbar?: boolean
  onDelete?: () => void
  onSettings?: () => void
  name?: string
  description?: string
}
export function WorkflowNode({
  children,
  showToolbar,
  onDelete,
  onSettings,
  name,
  description,
}: WorkflowNodesProps) {
  return (
    <>
      {showToolbar && (
        <NodeToolbar>
          <Button variant="ghost" size="icon" onClick={onSettings}>
            <SettingsIcon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <TrashIcon className="size-4" />
          </Button>
        </NodeToolbar>
      )}
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="text-center max-w-[200px]"
        >
          <div className="flex flex-col items-center gap-y-1">
            <h3 className="text-sm font-medium">{name}</h3>
            {description && (
              <p className="text-sm text-muted-foreground truncate">
                {description}
              </p>
            )}
          </div>
        </NodeToolbar>
      )}
    </>
  )
}
