import { requireAuth } from "@/modules/auth/helpers/requireAuth";
import { CredentialsPageView } from "@/modules/credentials";

export default async function CredentialsPage() {
  await requireAuth();
  return <CredentialsPageView />;
}
