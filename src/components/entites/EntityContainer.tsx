import React from "react"

interface EnitityContainerProps {
  header?: React.ReactNode
  search?: React.ReactNode
  pagination?: React.ReactNode
  children: React.ReactNode
}

export const EntityContainer = ({
  header,
  search,
  pagination,
  children,
}: EnitityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto w-full max-w-7xl flex flex-col gap-y-8 h-full">
        {header}

        <div className="flex flex-col gap-y-4 flex-1 min-h-0">
          {search}
          <div className="flex-1 min-h-0">{children}</div>
          {pagination}
        </div>
      </div>
    </div>
  )
}
