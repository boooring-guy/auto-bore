import InitialNode from "@/components/react-flows/InitialNode"
import { NodeType } from "@/lib/db/NodeType"
import HttpRequestNode from "@/modules/executions/components/http-requests/Node"
import { ManualTriggerNode } from "@/modules/triggers/components/manual-triggers/node"
import { NodeTypes } from "@xyflow/react"

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} satisfies NodeTypes

export type RegisteredNodeTypes = keyof typeof nodeComponents
