"use client";

import { authClient } from "@/lib/auth-client";
import type { Session } from "@/lib/auth";

/**
 * Hook to get the current user data and session
 *
 * @returns An object containing:
 * - `user`: The current user object (or null if not authenticated)
 * - `session`: The current session object (or null if not authenticated)
 * - `isLoading`: Boolean indicating if the session is being fetched
 * - `isAuthenticated`: Boolean indicating if the user is authenticated
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, session, isLoading, isAuthenticated } = useUser();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (!isAuthenticated) return <div>Please sign in</div>;
 *
 *   return <div>Welcome, {user?.name || user?.email}</div>;
 * }
 * ```
 */
export function useUser() {
  const { data: session, isPending: isLoading } = authClient.useSession();

  return {
    user: session?.user ?? null,
    session: session ?? null,
    isLoading,
    isAuthenticated: session !== null && session !== undefined,
  };
}
