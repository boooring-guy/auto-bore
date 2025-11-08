// based on EntityEmptyView
import { EntityEmptyView } from "@/components/entites/EntityStateView"
import React from "react"

type EditorEmptyProps = {
  message?: string
}

export function EditorEmpty({ message }: EditorEmptyProps) {
  return <EntityEmptyView message={message} entity="editor" />
}
