"use client";

import { useAuth } from "../hooks/useAuth";

export interface UserSignedOutProps {
  /**
   * Content to render when user is NOT authenticated
   */
  children: React.ReactNode;
  /**
   * Fallback content to show while checking authentication
   */
  fallback?: React.ReactNode;
  /**
   * Content to show when user IS authenticated (optional)
   */
  authenticated?: React.ReactNode;
}

/**
 * Component that only shows content when user is NOT authenticated
 *
 * Opposite of AuthGuard/UserSignedIn - useful for showing login forms,
 * sign up prompts, etc. only to unauthenticated users
 *
 * Also exported as `WhenNotSignedIn` for semantic clarity
 *
 * @example
 * ```tsx
 * // Basic usage
 * <UserSignedOut>
 *   <LoginForm />
 * </UserSignedOut>
 *
 * // With authenticated fallback
 * <UserSignedOut
 *   authenticated={<div>You are already signed in!</div>}
 * >
 *   <LoginForm />
 * </UserSignedOut>
 *
 * // With loading fallback
 * <UserSignedOut
 *   fallback={<div>Checking authentication...</div>}
 * >
 *   <LoginForm />
 * </UserSignedOut>
 * ```
 */
export function UserSignedOut({
  children,
  fallback,
  authenticated,
}: UserSignedOutProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <>{fallback}</> ?? null;
  }

  if (isAuthenticated) {
    return <>{authenticated}</> ?? null;
  }

  return <>{children}</>;
}

/**
 * Alias for UserSignedOut - shows content only when user is not signed in
 */
export const WhenNotSignedIn = UserSignedOut;

