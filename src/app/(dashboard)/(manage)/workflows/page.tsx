import { requireAuth } from "@/modules/auth/helpers/requireAuth";
import { WorkflowsPageView } from "@/modules/workflows";

export default async function WorkflowsPage() {
  await requireAuth();
  return <WorkflowsPageView />;
}
