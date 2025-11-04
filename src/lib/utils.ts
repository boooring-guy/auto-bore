import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefix map for table names to their ID prefixes
 * Excludes auth-schema tables (user, session, account, verification)
 * Add new tables here to maintain consistency and avoid errors
 */
export const TABLE_PREFIX_MAP = {
  workflows: "wfl",
} as const;

export type TableName = keyof typeof TABLE_PREFIX_MAP;

/**
 * Generates a unique ID with a table-specific prefix using nanoid
 * @param table - A table name from TABLE_PREFIX_MAP (e.g., "workflows")
 * @returns A prefixed unique ID (e.g., "wfl_abc123xyz")
 * @example
 * ```ts
 * const workflowId = generateId("workflows"); // Returns: "wfl_abc123xyz"
 * ```
 */
export function generateId(table: TableName, length: number = 6): string {
  const prefix = TABLE_PREFIX_MAP[table];
  return `${prefix}_${nanoid(length)}`;
}
