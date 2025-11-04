import React from "react";

type WorkflowIdPageProps = {
  workflowId: string;
};

export function WorkflowIdPageView({ workflowId }: WorkflowIdPageProps) {
  return <div>WorkflowIdPage: {workflowId}</div>;
}
