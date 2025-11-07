"use client";

import { SignUpForm } from "../components/SignUpForm";
import { AlreadyAuthenticatedWarning } from "../components/AlreadyAuthenticatedWarning";

export function SignUpPageView() {
  return (
    <>
      <AlreadyAuthenticatedWarning />
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
