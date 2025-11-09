import { nodeSelectorAtom } from "@/atoms/stateAtoms"
import NodeSelector from "@/components/react-flows/NodeSelector"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { memo } from "react"
import { useAtom } from "jotai"

export const AddNewNodeButton = memo(() => {
  const [open, setOpen] = useAtom(nodeSelectorAtom)
  return (
    <NodeSelector open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <PlusIcon className="size-4" />
      </Button>
    </NodeSelector>
  )
})

AddNewNodeButton.displayName = "AddNewNodeButton"
export default AddNewNodeButton
