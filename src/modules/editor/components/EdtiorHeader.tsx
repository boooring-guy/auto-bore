"use client"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import {
  useSuspenseWorkflow,
  useUpdateWorkflowName,
} from "@/modules/workflows/hooks/useWorkflow"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import React, { useState, useEffect, useRef } from "react"

type Props = {
  workflowId: string
}

// Breadcrumb

// save button
export function EditorHeaderSaveButton() {
  return (
    <div className="ml-auto">
      <Button variant="outline" size="sm" onClick={() => {}} disabled={false}>
        Save
      </Button>
    </div>
  )
}

export function EditorNameInput({ workflowId }: Props) {
  const { data: workflow } = useSuspenseWorkflow(workflowId)
  const updateWorkflowName = useUpdateWorkflowName()
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(workflow.name)
  const inputRef = useRef<HTMLInputElement>(null)

  // Sync name state when workflow data changes (only when not editing)
  useEffect(() => {
    if (!isEditing) {
      setName(workflow.name)
    }
  }, [workflow.name, isEditing])

  // focus the input when editing
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const handleSave = async () => {
    if (!isEditing) return
    // check if the name is same as the current name
    if (name === workflow.name) {
      setIsEditing(false)
      return
    }
    if (!name.trim()) {
      setName(workflow.name)
      setIsEditing(false)
      return
    }

    const trimmedName = name.trim()
    const queryOptions = trpc.workflows.getOne.queryOptions({ id: workflowId })

    // Capture previous query data for rollback
    const previousData = queryClient.getQueryData(queryOptions.queryKey)

    // Optimistically update the cache
    queryClient.setQueryData(queryOptions.queryKey, {
      ...workflow,
      name: trimmedName,
    })

    // Also update the displayed name immediately
    setIsEditing(false)

    try {
      await updateWorkflowName.mutateAsync({
        id: workflowId,
        name: trimmedName,
      })
    } catch (error) {
      // Revert optimistic update on error
      if (previousData) {
        queryClient.setQueryData(queryOptions.queryKey, previousData)
      }
      toast.error("Failed to update workflow name", {
        description: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setName(workflow.name)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <BreadcrumbItem className="cursor-pointer transition-colors hover:text-foreground">
        <InputGroup
          data-disabled={updateWorkflowName.isPending}
          className="h-8 rounded-none border-0 border-b border-border shadow-none focus-visible:outline-0 focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-none"
        >
          <InputGroupInput
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={workflow.name}
            disabled={updateWorkflowName.isPending}
          />
          <InputGroupAddon align="inline-end">
            {updateWorkflowName.isPending && <Spinner />}
          </InputGroupAddon>
        </InputGroup>
      </BreadcrumbItem>
    )
  }

  return (
    <BreadcrumbItem className="cursor-pointer transition-colors hover:text-foreground">
      <p onClick={() => setIsEditing(true)}>{workflow.name}</p>
    </BreadcrumbItem>
  )
}

// Editor Header Breadcrumb
export function EditorHeaderBreadcrumb({ workflowId }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Workflows</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function EdtiorHeader({ workflowId }: Props) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger />
      <EditorHeaderBreadcrumb workflowId={workflowId} />
      <EditorHeaderSaveButton />
    </header>
  )
}

export default EdtiorHeader
