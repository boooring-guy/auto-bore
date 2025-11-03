import type { Metadata } from "next";
import { LoginPageView } from "@/modules/auth/views/LoginPageView";

export const metadata: Metadata = {
  title: "Sign In | Auto_bore",
  description: "Sign in to your Auto_bore account",
};

export default function LoginPage() {
  return <LoginPageView />;
}
