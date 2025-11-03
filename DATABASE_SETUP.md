# Database Setup Guide

This project uses [Drizzle ORM](https://orm.drizzle.team/) with [Neon](https://neon.tech/) (serverless Postgres) for database management.

## Prerequisites

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy your database connection string

## Setup Steps

### 1. Environment Variables

Create a `.env.local` file in the root directory (use `env.example` as reference):

```bash
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

Replace with your actual Neon database connection string from the Neon console.

### 2. Generate Migrations

After updating your schema in `src/lib/db/schema.ts`, generate migrations:

```bash
npm run db:generate
```

This will create migration files in the `/drizzle` folder.

### 3. Push Schema to Database

Push your schema directly to the database (recommended for development):

```bash
npm run db:push
```

Or apply migrations (recommended for production):

```bash
npm run db:migrate
```

### 4. Open Drizzle Studio (Optional)

View and edit your database data with Drizzle Studio:

```bash
npm run db:studio
```

This opens a visual interface at `http://localhost:4983`

## Using the Database in Your Code

Import the database instance and schema:

```typescript
import { db } from "@/lib/db";
import { users, workflows } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Example: Create a user
const newUser = await db.insert(users).values({
  email: "user@example.com",
  name: "John Doe",
});

// Example: Query users
const allUsers = await db.select().from(users);

// Example: Query with conditions
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"));

// Example: Update
await db.update(users).set({ name: "Jane Doe" }).where(eq(users.id, userId));

// Example: Delete
await db.delete(users).where(eq(users.id, userId));
```

## Database Schema

The current schema includes:

- **users**: User accounts
- **workflows**: Automation workflows
- **workflow_executions**: Execution history and logs
- **connections**: App integrations and OAuth credentials

You can extend the schema in `src/lib/db/schema.ts` as needed.

## Available Scripts

- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:push` - Push schema changes directly to database (dev)
- `npm run db:migrate` - Run migrations (production)
- `npm run db:studio` - Open Drizzle Studio for visual database management

## Resources

- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Neon Documentation](https://neon.tech/docs)
- [Drizzle + Neon Guide](https://orm.drizzle.team/docs/get-started-postgresql#neon)
