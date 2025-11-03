"use client";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface AuthGuardProps {
  /**
   * Content to render when user is authenticated
   */
  children: React.ReactNode;
  /**
   * URL to redirect to if user is not authenticated (default: "/login")
   */
  redirectTo?: string;
  /**
   * Fallback content to show while checking authentication
   */
  fallback?: React.ReactNode;
  /**
   * Content to show when user is not authenticated (instead of redirecting)
   */
  unauthenticated?: React.ReactNode;
  /**
   * Whether to redirect or just show unauthenticated content
   */
  redirect?: boolean;
}

/**
 * Component that protects content and only shows it when user is authenticated
 *
 * Also exported as `UserSignedIn` for semantic clarity
 *
 * @example
 * ```tsx
 * // Basic usage with redirect
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 *
 * // With custom redirect
 * <AuthGuard redirectTo="/signin">
 *   <ProtectedContent />
 * </AuthGuard>
 *
 * // Without redirect (show fallback)
 * <AuthGuard
 *   redirect={false}
 *   unauthenticated={<div>Please sign in</div>}
 * >
 *   <ProtectedContent />
 * </AuthGuard>
 *
 * // With loading fallback
 * <AuthGuard
 *   fallback={<div>Checking authentication...</div>}
 *   unauthenticated={<div>Please sign in</div>}
 * >
 *   <ProtectedContent />
 * </AuthGuard>
 * ```
 */
export function AuthGuard({
  children,
  redirectTo = "/login",
  fallback,
  unauthenticated,
  redirect = true,
}: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && redirect) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirect, redirectTo, router]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated) {
    if (redirect) {
      // Show nothing while redirecting
      return null;
    }
    return <>{unauthenticated}</>;
  }

  return <>{children}</>;
}

/**
 * Alias for AuthGuard - shows content only when user is signed in
 */
export const UserSignedIn = AuthGuard;
