import { CredentialDetailPageView } from "@/modules/credentials";

type Props = {
  params: Promise<{ credentialId: string }>;
};

export default async function CredentialIdPage(props: Props) {
  const { credentialId } = await props.params;
  return <CredentialDetailPageView credentialId={credentialId} />;
}
