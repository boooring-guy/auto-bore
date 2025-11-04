/**
 * Inngest Event Names
 *
 * All event names should be defined here in UPPERCASE to prevent typos
 * and ensure type safety across the application.
 */

export const EVENTS = {
  TEST_HELLO_WORLD: "test/hello.world",

  CREATE_WORKFLOW: "workflow/create",
  // Add more events here as needed
} as const;

/**
 * Type-safe event name type
 * Use this when you need to reference event names in a type-safe way
 */
export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
