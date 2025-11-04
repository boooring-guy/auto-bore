import { useAtom } from "jotai"
import { upgradeModalOpenAtom } from "@/atoms/stateAtoms"
import { TRPCClientError } from "@trpc/client"
import { sentryLog } from "@/lib/utils"
import UpgradeModal from "@/components/upgrade-modal"
export function useUpgradeModal() {
  const [open, setOpen] = useAtom(upgradeModalOpenAtom)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  const onOpenChange = (value: boolean) => setOpen(value)

  const handleError = (error: unknown) => {
    if (error instanceof TRPCClientError) {
      if (error.data?.code === "FORBIDDEN") {
        openModal()
        return true
      }
      return false
    }
    sentryLog.error((error as Error).message, {
      log_source: "upgrade-modal",
      error: error,
    })
    return false
  }
  const modal = <UpgradeModal open={open} onOpenChange={onOpenChange} />

  return {
    handleError,
    modal,
  }
}
