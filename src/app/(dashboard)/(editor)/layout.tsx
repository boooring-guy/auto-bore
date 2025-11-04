import { EditorLayout } from "@/modules/editor";

export default function EditorGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EditorLayout>{children}</EditorLayout>;
}
