/**
 * Better Auth Server-Side Helpers
 *
 * This file provides utility functions for server-side authentication
 * operations, such as getting the current session in Server Components
 * or Server Actions.
 */

import { auth } from "@/lib/auth";
import type { Session } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Get the current session from the request
 *
 * Use this in Server Components or Server Actions to get the current user session.
 *
 * @example
 * ```tsx
 * // In a Server Component
 * import { getSession } from "@/lib/auth-helpers";
 *
 * export default async function Page() {
 *   const session = await getSession();
 *
 *   if (!session) {
 *     return <div>Please sign in</div>;
 *   }
 *
 *   return <div>Welcome, {session.user.name}</div>;
 * }
 * ```
 */
export async function getSession(): Promise<Session | null> {
  try {
    // Get headers from Next.js request
    const headersList = await headers();

    // Get session using Better Auth API
    const session = await auth.api.getSession({
      headers: headersList,
    });

    return session;
  } catch (error) {
    // If there's no session or an error occurs, return null
    return null;
  }
}

/**
 * Require authentication - throws an error if user is not authenticated
 *
 * Use this when you need to ensure a user is authenticated before proceeding.
 *
 * @example
 * ```tsx
 * // In a Server Action
 * import { requireAuth } from "@/lib/auth-helpers";
 *
 * export async function protectedAction() {
 *   const session = await requireAuth();
 *   // session is guaranteed to be non-null here
 *   return { userId: session.user.id };
 * }
 * ```
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized: Authentication required");
  }

  return session;
}

/**
 * Check if user is authenticated
 *
 * @returns true if user has a valid session, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}
