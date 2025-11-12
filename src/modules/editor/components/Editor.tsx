"use client"
import { useSuspenseWorkflow } from "@/modules/triggers/components/workflows/hooks/useWorkflow"
import { useState, useCallback } from "react"
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type EdgeChange,
  type NodeChange,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  Panel,
  Position,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { nodeComponents } from "@/config/node-components"
import AddNewNodeButton from "./AddNewNode"
import { editorReactFlowAtom } from "@/atoms/stateAtoms"
import { useSetAtom } from "jotai"
import { useAutoSave } from "@/hooks/useAutoSave"

type EditorProps = {
  workflowId: string
}

export function Editor({ workflowId }: EditorProps) {
  const { data: workflow } = useSuspenseWorkflow(workflowId)
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes)
  const [edges, setEdges] = useState<Edge[]>(workflow.connections)
  const setEditorReactFlow = useSetAtom(editorReactFlowAtom)

  // Enable auto-save based on settings
  useAutoSave(workflowId)

  console.log("nodes", nodes)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  )
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  )
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        fitView
        onInit={setEditorReactFlow}
        snapGrid={[10, 10]}
        snapToGrid={true}
        panOnScroll
        panOnDrag={false}
        selectionOnDrag
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel
          position={"top-right"}
          className="bg-background   rounded-lg border border-border"
        >
          <AddNewNodeButton />
        </Panel>
      </ReactFlow>
    </div>
  )
}
