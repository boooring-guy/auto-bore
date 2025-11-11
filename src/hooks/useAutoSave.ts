import { useEffect, useRef } from "react"
import { useAtomValue } from "jotai"
import { settingsAtom } from "@/config/settings"
import { editorReactFlowAtom } from "@/atoms/stateAtoms"
import { useUpdateWorkflow } from "@/modules/triggers/components/workflows/hooks/useWorkflow"

/**
 * Hook to automatically save workflow based on settings
 * @param workflowId - The ID of the workflow to save
 */
export function useAutoSave(workflowId: string) {
  const settings = useAtomValue(settingsAtom)
  const editorReactFlow = useAtomValue(editorReactFlowAtom)
  const saveWorkflow = useUpdateWorkflow()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastSaveRef = useRef<{ nodes: string; edges: string } | null>(null)

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Only set up auto-save if enabled
    if (!settings.autoSave || !editorReactFlow) {
      return
    }

    // Function to check if workflow has changed and save if needed
    const checkAndSave = () => {
      if (!editorReactFlow) return

      const nodes = editorReactFlow.getNodes()
      const edges = editorReactFlow.getEdges()

      // Serialize current state for comparison
      const currentState = {
        nodes: JSON.stringify(nodes),
        edges: JSON.stringify(edges),
      }

      // Only save if something has changed
      if (
        !lastSaveRef.current ||
        lastSaveRef.current.nodes !== currentState.nodes ||
        lastSaveRef.current.edges !== currentState.edges
      ) {
        // Don't save if already saving
        if (saveWorkflow.isPending) return

        saveWorkflow.mutate({
          id: workflowId,
          nodes,
          edges,
        })

        lastSaveRef.current = currentState
      }
    }

    // Set up interval based on settings
    intervalRef.current = setInterval(checkAndSave, settings.autoSaveInterval)

    // Cleanup on unmount or when settings change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [
    settings.autoSave,
    settings.autoSaveInterval,
    editorReactFlow,
    workflowId,
    saveWorkflow,
  ])
}
