// based on EntityLoadingView
import { EntityLoadingView } from "@/components/entites/EntityStateView"
import React from "react"

type EditorLoadingProps = {
  message?: string
}

export function EditorLoading({ message }: EditorLoadingProps) {
  return <EntityLoadingView message={message} entity="editor" />
}
