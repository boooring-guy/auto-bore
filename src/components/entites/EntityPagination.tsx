import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useState, useEffect } from "react"

interface EntityPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

// Custom PaginationLink that uses button instead of anchor for onClick handlers
const PaginationLinkButton = ({
  className,
  isActive,
  size = "icon",
  onClick,
  disabled,
  children,
  ...props
}: {
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}) => {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  // Track which button is loading
  const [loadingAction, setLoadingAction] = useState<
    "previous" | "next" | number | null
  >(null)

  // Clear loading state when page changes (indicating fetch completed)
  useEffect(() => {
    setLoadingAction(null)
  }, [page])

  // Don't render if no pages
  if (totalPages === 0) {
    return null
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5 // Maximum visible page numbers

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than maxVisible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of visible range around current page
      let start = Math.max(2, page - 1)
      let end = Math.min(totalPages - 1, page + 1)

      // Adjust if we're near the beginning
      if (page <= 3) {
        start = 2
        end = 4
      }

      // Adjust if we're near the end
      if (page >= totalPages - 2) {
        start = totalPages - 3
        end = totalPages - 1
      }

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("ellipsis")
      }

      // Add visible page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis")
      }

      // Always show last page (only if it's not already included)
      if (end < totalPages) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <Pagination className="w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationLinkButton
            onClick={() => {
              setLoadingAction("previous")
              onPageChange(Math.max(1, page - 1))
            }}
            disabled={page === 1 || disabled || loadingAction !== null}
            className="gap-1 px-2.5 sm:pr-2.5 w-full group"
          >
            {loadingAction === "previous" ? (
              <Spinner className="size-4" />
            ) : (
              <ChevronLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform duration-200" />
            )}
            <span className="hidden sm:inline">Previous</span>
            <span className="sr-only">Go to previous page</span>
          </PaginationLinkButton>
        </PaginationItem>

        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLinkButton
                isActive={pageNum === page}
                onClick={() => {
                  setLoadingAction(pageNum)
                  onPageChange(pageNum)
                }}
                disabled={disabled || loadingAction !== null}
              >
                {loadingAction === pageNum ? (
                  <Spinner className="size-4" />
                ) : (
                  pageNum
                )}
              </PaginationLinkButton>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationLinkButton
            onClick={() => {
              setLoadingAction("next")
              onPageChange(Math.min(totalPages, page + 1))
            }}
            disabled={page === totalPages || disabled || loadingAction !== null}
            className="gap-1 px-2.5 sm:pr-2.5 w-full group"
          >
            <span className="hidden sm:inline">Next</span>
            {loadingAction === "next" ? (
              <Spinner className="size-4" />
            ) : (
              <ChevronRightIcon className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            )}
            <span className="sr-only">Go to next page</span>
          </PaginationLinkButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { EntityPagination }
