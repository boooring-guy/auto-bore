import { cn } from "@/lib/utils"
import { EntityEmptyView } from "./EntityStateView"
import { Empty } from "../ui/empty"

interface EntityListViewProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey?: (item: T, index: number) => string | number
  emptyView?: React.ReactNode
  className?: string
  message?: string
  entity?: string
}

export const EntityListView = <T,>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
  message,
  entity,
}: EntityListViewProps<T>) => {
  if (items.length === 0) {
    return (
      <Empty className="min-h-[400px]">
        {emptyView || (
          <EntityEmptyView message={message} entity={entity || ""} />
        )}
      </Empty>
    )
  }
  return (
    <div className={cn("flex flex-col gap-y-4 ", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}
