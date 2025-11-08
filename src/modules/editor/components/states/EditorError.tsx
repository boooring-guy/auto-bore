// based on EntityErrorView
import { EntityErrorView } from "@/components/entites/EntityStateView"
import React from "react"

type EditorErrorProps = {
  message?: string
}

export function EditorError({ message }: EditorErrorProps) {
  return <EntityErrorView message={message} entity="editor" />
}
