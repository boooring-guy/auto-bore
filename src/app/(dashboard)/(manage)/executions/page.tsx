import { requireAuth } from "@/modules/auth/helpers/requireAuth";
import { ExecutionsPageView } from "@/modules/executions";

export default async function ExecutionsPage() {
  await requireAuth();
  return <ExecutionsPageView />;
}
