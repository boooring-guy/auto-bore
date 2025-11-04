import { ExecutionDetailPageView } from "@/modules/executions";

type Props = {
  params: Promise<{ executionId: string }>;
};

export default async function ExecutionIdPage(props: Props) {
  const { executionId } = await props.params;
  return <ExecutionDetailPageView executionId={executionId} />;
}
