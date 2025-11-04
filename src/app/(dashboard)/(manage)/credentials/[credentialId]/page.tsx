import { requireAuth } from "@/modules/auth/helpers/requireAuth";
import { CredentialDetailPageView } from "@/modules/credentials";

type Props = {
  params: Promise<{ credentialId: string }>;
};

export default async function CredentialIdPage(props: Props) {
  await requireAuth();
  const { credentialId } = await props.params;
  return <CredentialDetailPageView credentialId={credentialId} />;
}
