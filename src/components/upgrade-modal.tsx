"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { authClient } from "@/lib/auth-client"
import { StarIcon } from "lucide-react"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpgradeModal({
  open,
  onOpenChange,
}: UpgradeModalProps) {
  const handleUpgrade = () => {
    authClient.checkout({
      slug: "pro",
    })
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <StarIcon className="size-5 text-primary" />
            Upgrade to Pro
          </AlertDialogTitle>
          <AlertDialogDescription>
            Unlock all premium features and take your workflow to the next
            level. Upgrade to Pro to access advanced tools, priority support,
            and more.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpgrade}>
            Upgrade Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
