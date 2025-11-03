import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * When you need to ensure a user is authenticated before proceeding.
 * It will redirect to the login page if the user is not authenticated.
 * @param options.redirectTo - The URL to redirect to if the user is not authenticated.
 * @returns The session if the user is authenticated.
 * @throws {Error} If the user is not authenticated and the redirectTo option is not provided.
 * @example
 * ```tsx
 * import { requireAuth } from "@/modules/auth/helpers/requireAuth";
 *
 * export async function protectedAction() {
 *   const session = await requireAuth();
 *   // session is guaranteed to be non-null here
 *   return { userId: session.user.id };
 * }
 * ```
 */
export async function requireAuth(
  options: {
    redirectTo?: string;
  } = {
    redirectTo: "/login",
  }
) {
  const headersList = await headers();
  try {
    const session = await auth.api.getSession({
      headers: headersList,
    });
    if (!session) {
      redirect(options.redirectTo || "/login");
    }
    return session;
  } catch (error) {
    redirect(options.redirectTo || "/login");
  }
}
