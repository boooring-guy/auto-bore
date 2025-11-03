"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface SignInButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Provider to use for sign in
   * - "email": Redirects to login page for email/password sign in
   * - "github": Uses GitHub OAuth
   * - "google": Uses Google OAuth (if configured)
   */
  provider?: "email" | "github" | "google";
  /**
   * Callback URL after successful sign in
   */
  callbackURL?: string;
  /**
   * Custom onClick handler (optional)
   */
  onSignInStart?: () => void;
  /**
   * Custom onSignInSuccess handler (optional)
   */
  onSignInSuccess?: () => void;
  /**
   * Custom onSignInError handler (optional)
   */
  onSignInError?: (error: Error) => void;
}

/**
 * Button component for signing in users
 *
 * Supports email/password (redirects to login page) and OAuth providers
 *
 * @example
 * ```tsx
 * // Email sign in (redirects to login page)
 * <SignInButton>Sign In</SignInButton>
 *
 * // GitHub OAuth
 * <SignInButton provider="github">Sign in with GitHub</SignInButton>
 *
 * // Custom styling
 * <SignInButton variant="outline" size="lg">
 *   Sign In
 * </SignInButton>
 * ```
 */
export function SignInButton({
  provider = "email",
  callbackURL,
  onSignInStart,
  onSignInSuccess,
  onSignInError,
  children,
  className,
  disabled,
  ...props
}: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    onSignInStart?.();

    try {
      if (provider === "email") {
        // Redirect to login page for email/password sign in
        router.push("/login");
        return;
      }

      // OAuth sign in
      const result = await authClient.signIn.social({
        provider,
        callbackURL: callbackURL || "/",
      });

      if (result.error) {
        const error = new Error(result.error.message || "Failed to sign in");
        onSignInError?.(error);
        toast.error(result.error.message || "Failed to sign in");
        return;
      }

      onSignInSuccess?.();
      toast.success("Signed in successfully");

      if (callbackURL) {
        router.push(callbackURL);
      } else {
        router.refresh();
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred");
      onSignInError?.(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={disabled || isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children || "Signing in..."}
        </>
      ) : (
        children || "Sign In"
      )}
    </Button>
  );
}
