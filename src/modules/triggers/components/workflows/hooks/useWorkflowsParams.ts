import { useQueryStates } from "nuqs"
import { workFlowParams } from "../params"

export const useWorkflowsParams = () => {
  return useQueryStates(workFlowParams)
}
