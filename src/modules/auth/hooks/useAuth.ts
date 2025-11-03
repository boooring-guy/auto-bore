"use client";

import { authClient } from "@/lib/auth-client";

/**
 * Hook to check authentication status
 *
 * @returns An object containing:
 * - `isAuthenticated`: Boolean indicating if the user is authenticated
 * - `isLoading`: Boolean indicating if the authentication status is being checked
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, isLoading } = useAuth();
 *
 *   if (isLoading) return <div>Checking auth...</div>;
 *
 *   return isAuthenticated ? (
 *     <div>You are signed in</div>
 *   ) : (
 *     <div>Please sign in</div>
 *   );
 * }
 * ```
 */
export function useAuth() {
  const { data: session, isPending: isLoading } = authClient.useSession();

  return {
    isAuthenticated: session !== null && session !== undefined,
    isLoading,
    session,
    user: session?.user ?? null,
  };
}
