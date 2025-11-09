"use client"

import { BaseExecutionNode } from "@/modules/executions/components/BaseExecutionNode"
// import node nodeprops useReactflow
import { NodeProps, Node } from "@xyflow/react"
// globe2icon
import { Globe2Icon } from "lucide-react"
import { memo } from "react"

type HttpRequestNodeData = {
  endpoint?: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD"
  body?: string
  [key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const nodeData = props.data as HttpRequestNodeData
  const description = nodeData.endpoint
    ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
    : "NOT CONFIGURED"
  return (
    <BaseExecutionNode
      {...props}
      icon={Globe2Icon}
      name="HTTP Request"
      description={description}
      onSettings={() => {}}
      onDoubleClick={() => {}}
    />
  )
})

HttpRequestNode.displayName = "HttpRequestNode"

export default HttpRequestNode
