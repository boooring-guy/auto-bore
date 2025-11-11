import { Workflow } from "@/lib/db/schema"
import { atom } from "jotai"
import { ReactFlowInstance } from "@xyflow/react"

export const upgradeModalOpenAtom = atom<boolean>(false)
export const nodeSelectorAtom = atom<boolean>(false)
export const editorReactFlowAtom = atom<ReactFlowInstance | null>(null)
