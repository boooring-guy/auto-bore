
### 3. Generate Database Schema

Better Auth requires specific database tables. Generate them using the Better Auth CLI:

```bash
npx @better-auth/cli@latest generate
```

This will generate the schema in your `src/lib/db/schema.ts` file (or merge with existing schema).

### 4. Apply Database Migrations

After generating the schema, apply it to your database:

```bash
# Generate migration files
npm run db:generate

# Push schema to database (development)
npm run db:push

# OR apply migrations (production)
npm run db:migrate
```

## 📁 File Structure

The Better Auth setup creates the following files:

```
src/
├── lib/
│   ├── auth.ts              # Server-side auth configuration
│   ├── auth-client.ts        # Client-side auth instance
│   └── auth-helpers.ts       # Server-side helper functions
└── app/
    └── api/
        └── auth/
            └── [...all]/
                └── route.ts  # API route handler
```

## 🚀 Usage Examples

### Client-Side (React Components)

```tsx
"use client";

import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  const handleEmailSignIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email: "user@example.com",
      password: "password123",
    });

    if (error) {
      console.error(error);
      return;
    }

    // User signed in successfully
    console.log("Signed in:", data);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div>
      <button onClick={handleEmailSignIn}>Sign In with Email</button>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <button onClick={handleGithubSignIn}>Sign In with GitHub</button>
    </div>
  );
}
```

### Server-Side (Server Components)

```tsx
import { getSession, requireAuth } from "@/lib/auth-helpers";

// Get session (returns null if not authenticated)
export default async function Page() {
  const session = await getSession();

  if (!session) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {session.user.name}!</div>;
}

// Require authentication (throws error if not authenticated)
export default async function ProtectedPage() {
  const session = await requireAuth();

  return <div>Protected content for {session.user.email}</div>;
}
```

### Server Actions

```tsx
"use server";

import { requireAuth } from "@/lib/auth-helpers";

export async function protectedAction() {
  const session = await requireAuth();

  // This action requires authentication
  // Session is guaranteed to be non-null

  return { userId: session.user.id };
}
```

## ✅ Verification

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the API endpoint:**
   Visit `http://localhost:3000/api/auth/session` to check if Better Auth is working.

3. **Check database tables:**
   ```bash
   npm run db:studio
   ```

   You should see Better Auth tables like:
   - `user`
   - `session`
   - `account`
   - `verification`

## 🔒 Security Notes

- Never commit `.env.local` to version control
- Always use HTTPS in production
- Keep your `BETTER_AUTH_SECRET` secure and rotate it regularly
- Review OAuth app permissions and scopes
- Set appropriate CORS policies if needed

## 📚 Additional Resources

- [Better Auth Documentation](https://better-auth.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/building-your-application/authentication)

