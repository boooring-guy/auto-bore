"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import {
  MoreVerticalIcon,
  Trash2Icon,
  Loader2Icon,
  CircleIcon,
  CircleDotIcon,
} from "lucide-react"
import { Badge } from "../ui/badge"

type Status = "idle" | "running" | "success" | "error"

interface EntityItemProps<T = unknown> {
  item: T
  href: string
  title: string
  subtitle?: React.ReactNode | string
  image?: React.ReactNode
  actions?: React.ReactNode
  onRemove?: () => void | Promise<void>
  isRemoving?: boolean
  className?: string
  status?: Status
  lastRun?: string // ISO or display string
  progress?: number // 0-100, optional
  density?: "compact" | "regular"
}

const StatusPill: React.FC<{ status?: Status }> = ({ status = "idle" }) => {
  const map = {
    idle: "bg-muted text-muted-foreground",
    running: "bg-yellow-200 text-yellow-800",
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  } as const
  return (
    <Badge aria-hidden className={cn(map[status])}>
      <CircleDotIcon className="size-1.5 fill-current mr-1" />
      {status}
    </Badge>
  )
}

export const EntityItem = <T,>({
  item,
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving = false,
  className,
  status = "idle",
  lastRun,
  progress,
  density = "regular",
}: EntityItemProps<T>) => {
  // handle "activation" by keyboard on the card (Enter / Space)
  const onCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      // emulate link activation
      const link = (e.currentTarget as HTMLElement).querySelector("a")
      link?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    }
  }

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isRemoving) return
    if (onRemove) await onRemove()
  }

  const hasMenuActions = !!onRemove

  const densityClasses =
    density === "compact" ? "py-2 px-3 text-sm" : "py-3 px-4 text-base"

  return (
    <Link href={href} className="block" prefetch={false}>
      <Card
        className={cn(
          " duration-300  transform  hover:scale-[1.002]  shadow-none ",
          "border-2 border-transparent hover:border-primary transition-all ease-in-out  bg-linear-to-b from-white/60 to-white/40 dark:from-slate-900/60 dark:to-slate-900/40",
          "group cursor-pointer overflow-hidden",
          isRemoving && "cursor-not-allowed opacity-60",
          densityClasses,
          className
        )}
        role="button"
        onKeyDown={onCardKeyDown}
        tabIndex={0}
        aria-label={`${title} — ${subtitle ?? ""}`}
      >
        <CardHeader className="p-0">
          <div className="flex items-center gap-4 px-3 py-2">
            {/* Image / Avatar */}
            <div className="shrink-0">
              <div className="w-10 h-10 rounded-md bg-linear-to-br from-muted/40 to-muted/10 flex items-center justify-center overflow-hidden">
                {image ? (
                  image
                ) : (
                  <span className="font-medium text-sm select-none">
                    {String(title).slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-sm font-semibold leading-tight line-clamp-1">
                    {title}
                  </CardTitle>
                  {subtitle && (
                    <CardDescription className="text-xs text-muted-foreground line-clamp-1">
                      {subtitle}
                    </CardDescription>
                  )}
                </div>

                {/* Right utilities */}
                <div className="flex items-center gap-2 shrink-0">
                  {lastRun && (
                    <span className="text-xs text-muted-foreground hidden md:inline">
                      {lastRun}
                    </span>
                  )}
                  <StatusPill status={status} />

                  {/* custom actions */}
                  {actions && (
                    <CardAction
                      onClick={(e) => e.stopPropagation()}
                      className="hidden md:block"
                    >
                      {actions}
                    </CardAction>
                  )}

                  {/* menu */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity h-7 w-7"
                          aria-label="Open menu"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={handleRemove}
                          disabled={isRemoving}
                          className="flex items-center gap-2"
                        >
                          {isRemoving ? (
                            <Loader2Icon className="size-4 animate-spin" />
                          ) : (
                            <Trash2Icon className="size-4" />
                          )}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* optional progress bar */}
              {typeof progress === "number" && (
                <div
                  className="mt-2 h-1 rounded-full bg-muted/30 overflow-hidden"
                  aria-hidden
                >
                  <div
                    style={{
                      width: `${Math.max(0, Math.min(100, progress))}%`,
                    }}
                    className="h-full rounded-full transition-width duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default EntityItem
