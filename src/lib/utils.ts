import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { nanoid } from "nanoid"
import * as Sentry from "@sentry/nextjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prefix map for table names to their ID prefixes
 * Excludes auth-schema tables (user, session, account, verification)
 * Add new tables here to maintain consistency and avoid errors
 */
export const TABLE_PREFIX_MAP = {
  workflows: "wfl",
  nodes: "nd",
  connections: "conn",
} as const

export type TableName = keyof typeof TABLE_PREFIX_MAP

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
  const prefix = TABLE_PREFIX_MAP[table]
  return `${prefix}_${nanoid(length)}`
}

/**
 * Sentry logger utility for easy logging throughout the codebase
 * @example
 * ```ts
 * import { sentryLog } from "@/lib/utils";
 * sentryLog.info("User logged in", { log_source: "auth" });
 * sentryLog.error("Failed to fetch data", { log_source: "api" });
 * ```
 */
export const sentryLog = {
  info: (
    message: string,
    context?: { log_source?: string; [key: string]: unknown }
  ) => {
    Sentry.logger.info(message, context || {})
    // devlopment env log to console
    if (process.env.NODE_ENV === "development") {
      console.log(message, context || {})
    }
  },
  warn: (
    message: string,
    context?: { log_source?: string; [key: string]: unknown }
  ) => {
    Sentry.logger.warn(message, context || {})
    if (process.env.NODE_ENV === "development") {
      console.warn(message, context || {})
    }
  },
  error: (
    message: string,
    context?: { log_source?: string; [key: string]: unknown }
  ) => {
    Sentry.logger.error(message, context || {})
    if (process.env.NODE_ENV === "development") {
      console.error(message, context || {})
    }
  },
  debug: (
    message: string,
    context?: { log_source?: string; [key: string]: unknown }
  ) => {
    Sentry.logger.debug(message, context || {})
    if (process.env.NODE_ENV === "development") {
      console.debug(message, context || {})
    }
  },
}
