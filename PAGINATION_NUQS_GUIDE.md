# Pagination with nuqs Guide

This guide demonstrates how to implement pagination using **nuqs** (Next.js URL Search State) in a Next.js application with tRPC. This pattern provides type-safe URL state management for pagination, search, and filtering parameters.

## Overview

This implementation uses:

- **nuqs** - Type-safe URL search state management for Next.js
- **tRPC** - End-to-end typesafe APIs
- **TanStack Query** - Data fetching and caching
- **Server Components** - For data prefetching
- **Suspense** - For progressive loading

The pagination system supports:

- Page-based pagination (`page`, `pageSize`)
- Search functionality (`search`)
- URL state synchronization (URL params reflect current state)
- Server-side prefetching for optimal performance
- Type-safe parameter handling

## File Structure

```
src/
├── config/
│   └── constants.ts              # Pagination constants
├── modules/
│   └── workflows/                # Example module using pagination
│       ├── params.ts             # Parameter definitions (server & client)
│       ├── hooks/
│       │   ├── useWorkflowsParams.ts    # Client hook for params
│       │   └── useWorkflows.ts          # Data fetching hooks
│       ├── server/
│       │   ├── paramsLoader.ts          # Server-side param loader
│       │   ├── prefetch.ts              # Data prefetching function
│       │   └── routers.ts               # tRPC router definition
│       └── components/
│           └── workflows.tsx            # Client components
└── app/
    ├── layout.tsx                # Root layout with NuqsAdapter
    └── (dashboard)/
        └── (manage)/
            └── workflows/
                └── page.tsx      # Server component page
```

## Step-by-Step Implementation

### Step 1: Install Dependencies

Ensure you have `nuqs` installed:

```bash
npm install nuqs
# or
pnpm add nuqs
```

### Step 2: Setup NuqsAdapter in Root Layout

Wrap your app with `NuqsAdapter` in the root layout:

```tsx
// src/app/layout.tsx
import { NuqsAdapter } from "nuqs/adapters/next/app"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          {/* Your app content */}
          {children}
        </NuqsAdapter>
      </body>
    </html>
  )
}
```

**Important:** The `NuqsAdapter` must be a client component wrapper. If your layout is a server component, you can still use it as shown above.

### Step 3: Define Pagination Constants

Create a constants file to centralize pagination defaults:

```tsx
// src/config/constants.ts
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MIN_PAGE_SIZE: 1,
  MAX_PAGE_SIZE: 100,
  DEFAULT_SORT: "createdAt",
  DEFAULT_SORT_ORDER: "desc",
  DEFAULT_SEARCH: "",
}
```

### Step 4: Define Parameters Schema

Create a shared parameters definition that works for both server and client:

```tsx
// src/modules/workflows/params.ts
import { parseAsInteger, parseAsString } from "nuqs/server"
import { PAGINATION } from "@/config/constants"

export const workFlowParams = {
  page: parseAsInteger.withDefault(PAGINATION.DEFAULT_PAGE).withOptions({
    clearOnDefault: true, // Clears the param from URL when default value is used
  }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({
      clearOnDefault: true,
    }),
  search: parseAsString.withDefault(PAGINATION.DEFAULT_SEARCH).withOptions({
    clearOnDefault: true,
  }),
}
```

**Key Points:**
- `parseAsInteger` / `parseAsString` - Type-safe parsers from nuqs
- `withDefault()` - Sets default values when params are missing
- `clearOnDefault: true` - Removes params from URL when they match defaults (cleaner URLs)

### Step 5: Create Server-Side Parameter Loader

Create a loader function for server components:

```tsx
// src/modules/workflows/server/paramsLoader.ts
import { createLoader } from "nuqs/server"
import { workFlowParams } from "../params"

export const workFlowParamsLoader = createLoader(workFlowParams)
```

This loader:
- Parses search params from the URL
- Applies defaults
- Returns typed parameters for server components

### Step 6: Create Client-Side Hook

Create a hook for client components to access and update URL state:

```tsx
// src/modules/workflows/hooks/useWorkflowsParams.ts
import { useQueryStates } from "nuqs"
import { workFlowParams } from "../params"

export const useWorkflowsParams = () => {
  return useQueryStates(workFlowParams)
}
```

**Usage in client components:**

```tsx
"use client"

import { useWorkflowsParams } from "../hooks/useWorkflowsParams"

export function MyComponent() {
  const [params, setParams] = useWorkflowsParams()

  // Access values
  const { page, pageSize, search } = params

  // Update values (automatically updates URL)
  const handlePageChange = (newPage: number) => {
    setParams({ page: newPage })
  }

  const handleSearchChange = (newSearch: string) => {
    setParams({ search: newSearch })
  }

  return (
    <div>
      <input
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <button onClick={() => handlePageChange(page + 1)}>
        Next Page
      </button>
    </div>
  )
}
```

### Step 7: Create Data Prefetching Function

Create a server-side prefetch function for optimal performance:

```tsx
// src/modules/workflows/server/prefetch.ts
import { prefetch } from "@/trpc/server"
import { trpc } from "@/trpc/server"

export const prefetchWorkflows = async (params: {
  page: number
  pageSize: number
  search: string
}) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params))
}
```

**Note:** This assumes you have a `prefetch` utility and `trpc` setup. Adjust to match your tRPC configuration.

### Step 8: Define tRPC Router

Create your tRPC router with pagination support:

```tsx
// src/modules/workflows/server/routers.ts
import { createTRPCRouter, protectedProcedure } from "@/trpc/server"
import { z } from "zod"
import { PAGINATION } from "@/config/constants"
import { db } from "@/lib/db"
import { workflows } from "@/lib/db/schema"
import { eq, ilike, and, desc } from "drizzle-orm"

export const workflowsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().optional().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .optional()
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().optional().default(PAGINATION.DEFAULT_SEARCH),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input

      // Fetch data and count in parallel
      const [items, totalCount] = await Promise.all([
        db.query.workflows.findMany({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          where: and(
            eq(workflows.userId, ctx.auth.user.id),
            ilike(workflows.name, `%${search}%`)
          ),
          orderBy: desc(workflows.createdAt),
        }),
        db.$count(workflows, eq(workflows.userId, ctx.auth.user.id)),
      ])

      const totalPages = Math.ceil(totalCount / pageSize)
      const hasNextPage = page < totalPages
      const hasPreviousPage = page > 1

      return {
        data: items,
        meta: {
          totalCount,
          page,
          pageSize,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      }
    }),
})
```

**Response Structure:**
- `data` - Array of items for current page
- `meta` - Pagination metadata including:
  - `totalCount` - Total number of items
  - `page` - Current page number
  - `pageSize` - Items per page
  - `totalPages` - Total number of pages
  - `hasNextPage` - Boolean indicating if there's a next page
  - `hasPreviousPage` - Boolean indicating if there's a previous page

### Step 9: Create Data Fetching Hook

Create a client hook for fetching data using Suspense:

```tsx
// src/modules/workflows/hooks/useWorkflows.ts
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useWorkflowsParams } from "./useWorkflowsParams"

export const useSuspenseWorkflows = () => {
  const trpc = useTRPC()
  const [params] = useWorkflowsParams()
  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}
```

**Note:** This uses `useSuspenseQuery` which requires a Suspense boundary. For non-suspense queries, use `useQuery` instead.

### Step 10: Implement Server Page Component

Create your server component page that prefetches data:

```tsx
// src/app/(dashboard)/(manage)/workflows/page.tsx
import { requireAuth } from "@/modules/auth/helpers/requireAuth"
import WorkflowsList from "@/modules/workflows/components/workflows"
import { HydrateClient } from "@/trpc/server"
import { prefetchWorkflows } from "@/modules/workflows/server/prefetch"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import type { SearchParams } from "nuqs/server"
import { workFlowParamsLoader } from "@/modules/workflows/server/paramsLoader"

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function WorkflowsPage({ searchParams }: Props) {
  await requireAuth()

  // Load and parse URL parameters
  const params = await workFlowParamsLoader(searchParams)

  // Prefetch data for the current page
  await prefetchWorkflows(params)

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <WorkflowsList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
```

**Key Points:**
- `searchParams` is a Promise in Next.js App Router
- `workFlowParamsLoader` parses and validates URL params
- `prefetchWorkflows` prefetches data for optimal performance
- `HydrateClient` hydrates the React Query cache
- `Suspense` boundary allows progressive loading

### Step 11: Create Client Component

Create your client component that displays the data:

```tsx
// src/modules/workflows/components/workflows.tsx
"use client"

import { useSuspenseWorkflows } from "../hooks/useWorkflows"
import { useWorkflowsParams } from "../hooks/useWorkflowsParams"

export default function WorkflowsList() {
  const { data } = useSuspenseWorkflows()
  const [params, setParams] = useWorkflowsParams()

  const { data: workflows, meta } = data

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        value={params.search}
        onChange={(e) => setParams({ search: e.target.value, page: 1 })}
        placeholder="Search workflows..."
      />

      {/* Workflows List */}
      <div>
        {workflows.map((workflow) => (
          <div key={workflow.id}>{workflow.name}</div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div>
        <button
          disabled={!meta.hasPreviousPage}
          onClick={() => setParams({ page: params.page - 1 })}
        >
          Previous
        </button>

        <span>
          Page {meta.page} of {meta.totalPages}
        </span>

        <button
          disabled={!meta.hasNextPage}
          onClick={() => setParams({ page: params.page + 1 })}
        >
          Next
        </button>
      </div>

      {/* Results Count */}
      <div>
        Showing {workflows.length} of {meta.totalCount} workflows
      </div>
    </div>
  )
}
```

## Complete Example Flow

Here's how the complete flow works:

```
1. User visits /workflows?page=2&search=test
   ↓
2. Server Component (page.tsx) receives searchParams
   ↓
3. workFlowParamsLoader parses: { page: 2, pageSize: 10, search: "test" }
   ↓
4. prefetchWorkflows fetches data for page 2 with search "test"
   ↓
5. HydrateClient hydrates React Query cache
   ↓
6. Client Component (WorkflowsList) renders
   ↓
7. useWorkflowsParams() reads URL state: { page: 2, pageSize: 10, search: "test" }
   ↓
8. useSuspenseWorkflows() uses params to fetch from cache
   ↓
9. Component displays data and pagination controls
   ↓
10. User clicks "Next Page"
    ↓
11. setParams({ page: 3 }) updates URL to /workflows?page=3&search=test
    ↓
12. Next.js navigation triggers, process repeats from step 2
```

## Advanced Patterns

### Adding More Parameters

You can easily extend the params schema:

```tsx
// src/modules/workflows/params.ts
import { parseAsInteger, parseAsString, parseAsArrayOf } from "nuqs/server"

export const workFlowParams = {
  // ... existing params
  status: parseAsArrayOf(parseAsString).withDefault([]),
  sortBy: parseAsString.withDefault("createdAt"),
  sortOrder: parseAsString.withDefault("desc").withOptions({
    history: "push", // Use push instead of replace for history
  }),
}
```

### Debounced Search

For search inputs, consider debouncing:

```tsx
"use client"

import { useWorkflowsParams } from "../hooks/useWorkflowsParams"
import { useDebouncedCallback } from "use-debounce"

export function SearchInput() {
  const [params, setParams] = useWorkflowsParams()

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setParams({ search: value, page: 1 })
  }, 300)

  return (
    <input
      defaultValue={params.search}
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

### Custom URL Formatting

You can customize URL parameter names:

```tsx
export const workFlowParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({
      clearOnDefault: true,
      // Custom URL parameter name
      shallow: false, // Use full navigation instead of shallow
    }),
}
```

### Conditional Parameters

You can make parameters optional or conditional:

```tsx
import { parseAsInteger, parseAsString } from "nuqs/server"

export const workFlowParams = {
  page: parseAsInteger.withDefault(1),
  // Only include in URL if not default
  filter: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
  }),
}
```

## Best Practices

1. **Use `clearOnDefault: true`** - Keeps URLs clean by removing default values
2. **Define defaults in constants** - Centralize pagination configuration
3. **Validate on server** - Always validate params in your tRPC router
4. **Prefetch data** - Use server-side prefetching for better performance
5. **Use Suspense** - Leverage Suspense boundaries for progressive loading
6. **Type safety** - Share param definitions between server and client
7. **Debounce search** - Prevent excessive API calls during typing
8. **Reset page on filter change** - When search/filter changes, reset to page 1

## Common Patterns

### Reset Page on Search

```tsx
const handleSearch = (value: string) => {
  setParams({ search: value, page: 1 }) // Reset to first page
}
```

### Update Multiple Params

```tsx
const handleFilterChange = (filters: FilterState) => {
  setParams({
    ...filters,
    page: 1, // Reset pagination when filters change
  })
}
```

### Programmatic Navigation

```tsx
import { useRouter } from "next/navigation"

const router = useRouter()
const [params, setParams] = useWorkflowsParams()

// Navigate to specific page
const goToPage = (page: number) => {
  setParams({ page })
  // URL updates automatically, no need for router.push
}
```

## Troubleshooting

### Params Not Updating URL

**Issue:** URL doesn't change when calling `setParams()`

**Solution:**
- Ensure `NuqsAdapter` wraps your app in the root layout
- Check that you're using `useQueryStates` from `nuqs` (not `nuqs/server`)
- Verify the component is a client component (`"use client"`)

### Server/Client Param Mismatch

**Issue:** Server and client see different param values

**Solution:**
- Use the same param definition object for both server (`createLoader`) and client (`useQueryStates`)
- Ensure defaults match between server and client parsers

### Hydration Errors

**Issue:** Hydration mismatch warnings

**Solution:**
- Use `suppressHydrationWarning` on the `<html>` tag if needed
- Ensure server and client use the same default values
- Prefer server-side prefetching over client-side initial fetch

### Type Errors

**Issue:** TypeScript errors with params

**Solution:**
- Ensure param definitions are imported from the same file
- Use `parseAsInteger` / `parseAsString` from `nuqs/server` for server-side
- Use `useQueryStates` from `nuqs` (not `nuqs/server`) for client-side

### Search Params Not Parsed

**Issue:** `searchParams` is undefined or not parsed correctly

**Solution:**
- In Next.js App Router, `searchParams` is a Promise
- Use `await workFlowParamsLoader(searchParams)` not `workFlowParamsLoader(await searchParams)`
- Check that your page component is async

## Directory Tree Reference

```
src/
├── config/
│   └── constants.ts                    # Shared constants
│
├── modules/
│   └── [module-name]/                  # Feature module
│       ├── params.ts                   # ✨ Parameter definitions
│       ├── hooks/
│       │   ├── use[Module]Params.ts    # ✨ Client param hook
│       │   └── use[Module].ts          # Data fetching hooks
│       ├── server/
│       │   ├── paramsLoader.ts         # ✨ Server param loader
│       │   ├── prefetch.ts             # Data prefetching
│       │   └── routers.ts              # tRPC router
│       └── components/
│           └── [module].tsx            # Client components
│
└── app/
    ├── layout.tsx                      # ✨ NuqsAdapter setup
    └── [routes]/
        └── page.tsx                    # ✨ Server page component
```

**Legend:**
- ✨ = Required for nuqs pagination setup

## Quick Start Checklist

When implementing pagination in a new module:

- [ ] Install `nuqs` package
- [ ] Add `NuqsAdapter` to root layout
- [ ] Create `params.ts` with parameter definitions
- [ ] Create `server/paramsLoader.ts` with `createLoader`
- [ ] Create `hooks/use[Module]Params.ts` with `useQueryStates`
- [ ] Create `server/prefetch.ts` for data prefetching
- [ ] Update tRPC router to accept pagination params
- [ ] Create server page component that uses loader and prefetch
- [ ] Create client component that uses params hook
- [ ] Add pagination controls to UI

## Resources

- [nuqs Documentation](https://nuqs.47ng.com/)
- [Next.js App Router Search Params](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams)
- [tRPC Documentation](https://trpc.io/)
- [TanStack Query Suspense](https://tanstack.com/query/latest/docs/react/guides/suspense)

## Summary

This pattern provides:

✅ **Type-safe URL state** - Full TypeScript support
✅ **Server/client sync** - Shared param definitions
✅ **Optimal performance** - Server-side prefetching
✅ **Clean URLs** - Default values automatically removed
✅ **Progressive loading** - Suspense boundaries
✅ **Easy to extend** - Add new params easily

The key is using the same param definition object (`workFlowParams`) for both server-side loading (`createLoader`) and client-side state management (`useQueryStates`), ensuring perfect synchronization between URL and application state.

