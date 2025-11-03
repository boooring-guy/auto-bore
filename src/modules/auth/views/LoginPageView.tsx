"use client";

import Link from "next/link";
import { Github } from "lucide-react";
import { LoginForm } from "../components/LoginForm";
import { DecorativePanel } from "../components/DecorativePanel";
import { AuthFooter } from "../components/AuthFooter";
import { AlreadyAuthenticatedWarning } from "../components/AlreadyAuthenticatedWarning";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function LoginPageView() {
  const handleSSOSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <>
      <AlreadyAuthenticatedWarning />
      <div className="flex min-h-screen bg-white pb-14">
        {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-2xl">A</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <Link
                href="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <LoginForm />

            {/* OR Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* GitHub Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleSSOSignIn}
              className="w-full h-11 rounded-lg border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium"
            >
              <Github className="mr-2 h-5 w-5" />
              Continue with GitHub
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:block w-[33.333%] relative">
        <DecorativePanel />
      </div>

      {/* Footer */}
      <AuthFooter />
      </div>
    </>
  );
}
