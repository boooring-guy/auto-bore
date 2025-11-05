import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

type EnitityHeaderProps = {
  title: string
  description?: string
  newButtonLabel?: string
  disabled?: boolean
  isCreating?: boolean
} & /* Mutually exclusive  one or none */ (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew: never; newButtonHref?: never }
)

export const EntityHeader = ({
  title,
  description,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
  newButtonHref,
}: EnitityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button
          onClick={onNew}
          disabled={isCreating || disabled}
          className="mt-2"
          size="sm"
        >
          {isCreating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <PlusIcon className="size-4" />
          )}
          {isCreating ? "Creating..." : newButtonLabel || "New"}
        </Button>
      )}
      {newButtonHref && !onNew && (
        <Button asChild size="sm">
          <Link href={newButtonHref}>
            <PlusIcon className="size-4" />
            {newButtonLabel || "New"}
          </Link>
        </Button>
      )}
    </div>
  )
}
