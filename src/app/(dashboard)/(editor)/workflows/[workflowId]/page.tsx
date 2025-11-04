import { WorkflowIdPageView } from "@/modules/workflows/views/WorkflowIdPageView";

type Props = {
  params: Promise<{ workflowId: string }>;
};

export default async function WorkflowIdPage(props: Props) {
  const { workflowId } = await props.params;
  return <WorkflowIdPageView workflowId={workflowId} />;
}
