"use client"

import { Spinner } from "../ui/spinner"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty"
import {
  AlertCircle,
  PackageOpenIcon,
  PlusIcon,
  RotateCcwIcon,
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface EntityStateViewProps {
  message?: string
  entity: string
}

export const EntityLoadingView = ({
  message,
  entity,
}: EntityStateViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] p-6">
      <Spinner className="size-10 animate-spin" />
      <p className="text-sm text-primary mt-4">
        {!!message && (
          <span className="text-sm text-muted-foreground">{message}</span>
        )}
      </p>
    </div>
  )
}

// ErrorView
interface EntityErrorViewProps extends EntityStateViewProps {
  error?: Error
  cause?: string
  title?: string
  description?: string
}

export const EntityErrorView = ({
  message,
  entity,
  error,
  cause,
  title,
  description,
}: EntityErrorViewProps) => {
  const errorTitle = title || `Failed to load ${entity}`
  const errorDescription =
    description ||
    message ||
    error?.message ||
    cause ||
    "Something went wrong. Please try again later."

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] p-6">
      <Empty className="border-0  overflow-auto ">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertCircle className="size-6 text-destructive" />
          </EmptyMedia>
          <EmptyTitle className="text-destructive">{errorTitle}</EmptyTitle>
          <EmptyDescription>
            <p className="mb-2"> {errorDescription}</p>

            {/* Reload button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
              className="group"
            >
              <RotateCcwIcon className="size-4 group-hover:-rotate-180 transition-all duration-300" />
              Reload
            </Button>
          </EmptyDescription>
        </EmptyHeader>
        {error && process.env.NODE_ENV === "development" && (
          <EmptyContent className="max-h-[300px]  scrollbar-thumb-sky-700 scrollbar-track-sky-300  overflow-auto">
            <div className="text-xs font-mono  text-muted-foreground bg-muted p-2 rounded">
              {error.stack || error.message}
            </div>
          </EmptyContent>
        )}
      </Empty>
    </div>
  )
}

interface EntityEmptyViewProps extends EntityStateViewProps {
  title?: string
  onNew?: () => void
}

export const EntityEmptyView = ({
  message,
  title,
  onNew,
  entity,
}: EntityEmptyViewProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon className="size-6 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle className="text-muted-foreground">{title}</EmptyTitle>
        {!!message && <EmptyDescription>{message}</EmptyDescription>}
      </EmptyHeader>
      {!!onNew && (
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={onNew}>
            <PlusIcon className="size-4" />
            Create {entity}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}

// EntityListView
interface EntityListViewProps<T> extends EntityStateViewProps {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  getKey?: (item: T, index: number) => string | number
  emptyView?: React.ReactNode
  className?: string
}
