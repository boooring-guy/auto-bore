type ExecutionDetailPageViewProps = {
  executionId: string;
};

export function ExecutionDetailPageView({
  executionId,
}: ExecutionDetailPageViewProps) {
  return <div>ExecutionDetailPage: {executionId}</div>;
}
