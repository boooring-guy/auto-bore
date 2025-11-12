"use client"

import { BaseExecutionNode } from "@/modules/executions/components/BaseExecutionNode"
// import node nodeprops useReactflow
import { NodeProps, Node, useReactFlow } from "@xyflow/react"
// globe2icon
import { Globe2Icon } from "lucide-react"
import { memo, useState } from "react"
import { HttpRequestDialog, HttpRequestFormType } from "./hr-dialog"

type HttpRequestNodeData = {
  endpoint?: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD"
  body?: string
  [key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { setNodes } = useReactFlow()
  const nodeStatus = "initial"
  const nodeData = props.data as HttpRequestNodeData
  const description = nodeData.endpoint
    ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
    : "NOT CONFIGURED"
  const handleDoubleClick = () => {
    setDialogOpen(true)
  }
  const handleSettingsClick = () => {
    setDialogOpen(true)
  }

  const handleSubmit = (values: HttpRequestFormType) => {
    console.log("Form submitted with values:", values)
    setNodes((prevNodes) => {
      return prevNodes.map((node) => {
        if (node.id === props.id) {
          return { ...node, data: { ...node.data, ...values } }
        }
        return node
      })
    })
    setDialogOpen(false)
  }

  return (
    <>
      <HttpRequestDialog
        defaultBody={nodeData.body}
        defaultEndPoint={nodeData.endpoint}
        defaultMethod={nodeData.method}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
      />
      <BaseExecutionNode
        {...props}
        icon={Globe2Icon}
        name="HTTP Request"
        description={description}
        onSettings={handleSettingsClick}
        onDoubleClick={handleDoubleClick}
        status={nodeStatus}
      />
    </>
  )
})

HttpRequestNode.displayName = "HttpRequestNode"

export default HttpRequestNode
