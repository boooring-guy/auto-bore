"use client";

import { LoginForm } from "../components/LoginForm";
import { AlreadyAuthenticatedWarning } from "../components/AlreadyAuthenticatedWarning";

export function LoginPageView() {
  return (
    <>
      <AlreadyAuthenticatedWarning />
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
