"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface SignOutButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /**
   * Callback URL after successful sign out
   */
  callbackURL?: string;
  /**
   * Custom onClick handler (optional)
   */
  onSignOutStart?: () => void;
  /**
   * Custom onSignOutSuccess handler (optional)
   */
  onSignOutSuccess?: () => void;
  /**
   * Custom onSignOutError handler (optional)
   */
  onSignOutError?: (error: Error) => void;
  /**
   * Show logout icon
   */
  showIcon?: boolean;
}

/**
 * Button component for signing out users
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SignOutButton>Sign Out</SignOutButton>
 *
 * // With icon
 * <SignOutButton showIcon>Sign Out</SignOutButton>
 *
 * // Custom styling
 * <SignOutButton variant="ghost" size="sm">
 *   Sign Out
 * </SignOutButton>
 *
 * // With callback
 * <SignOutButton
 *   callbackURL="/login"
 *   onSignOutSuccess={() => console.log("Signed out!")}
 * >
 *   Sign Out
 * </SignOutButton>
 * ```
 */
export function SignOutButton({
  callbackURL,
  onSignOutStart,
  onSignOutSuccess,
  onSignOutError,
  showIcon = false,
  children,
  className,
  disabled,
  ...props
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    onSignOutStart?.();

    try {
      const result = await authClient.signOut();

      if (result.error) {
        const error = new Error(result.error.message || "Failed to sign out");
        onSignOutError?.(error);
        toast.error(result.error.message || "Failed to sign out");
        return;
      }

      onSignOutSuccess?.();
      toast.success("Signed out successfully");

      if (callbackURL) {
        router.push(callbackURL);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      const err =
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred");
      onSignOutError?.(err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      disabled={disabled || isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children || "Signing out..."}
        </>
      ) : (
        <>
          {showIcon && <LogOut className="mr-2 h-4 w-4" />}
          {children || "Sign Out"}
        </>
      )}
    </Button>
  );
}
