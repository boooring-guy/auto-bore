"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface ManualTriggerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ManualTriggerDialog = ({
  open,
  onOpenChange,
}: ManualTriggerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            Trigger the workflow manually by clicking the button.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <pre className="text-sm">
            {`This will trigger the workflow manually.`}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}
