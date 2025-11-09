import InitialNode from "@/components/react-flows/InitialNode"
import { NodeType } from "@/lib/db/NodeType"
import { NodeTypes } from "@xyflow/react"
export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
} satisfies NodeTypes

export type RegisteredNodeTypes = keyof typeof nodeComponents
