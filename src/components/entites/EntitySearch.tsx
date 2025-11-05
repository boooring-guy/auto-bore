import { SearchIcon } from "lucide-react"
import React from "react"
import { Input } from "../ui/input"

type EntitySearchProps = {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export const EntitySearch = ({
  placeholder,
  value,
  onChange,
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=" max-w-[200px]  bg-background shadow-none border-border pl-8"
      />
    </div>
  )
}
