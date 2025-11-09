import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { memo } from "react"

export const AddNewNodeButton = memo(() => {
  return (
    <div>
      <Button variant="ghost" size="icon" onClick={() => {}}>
        <PlusIcon className="size-4" />
      </Button>
    </div>
  )
})

AddNewNodeButton.displayName = "AddNewNodeButton"
export default AddNewNodeButton
