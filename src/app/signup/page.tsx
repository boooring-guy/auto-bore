import type { Metadata } from "next";
import { SignUpPageView } from "@/modules/auth/views/SignUpPageView";

export const metadata: Metadata = {
  title: "Sign Up | Auto_bore",
  description: "Create your Auto_bore account",
};

export default function SignUpPage() {
  return <SignUpPageView />;
}
