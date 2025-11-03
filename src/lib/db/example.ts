/**
 * Example usage of the database
 *
 * This file shows examples of how to use Drizzle ORM with Neon
 * Remove this file or use it as a reference for your own implementation
 */

import { db } from "./index";
import { users, workflows, connections, workflowExecutions } from "./schema";
import { eq, desc } from "drizzle-orm";

// Example: Create a new user
export async function createUser(email: string, name?: string) {
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      name: name || null,
    })
    .returning();

  return newUser;
}

// Example: Get user by email
export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
}

// Example: Get all workflows for a user
export async function getUserWorkflows(userId: string) {
  return await db
    .select()
    .from(workflows)
    .where(eq(workflows.userId, userId))
    .orderBy(desc(workflows.createdAt));
}

// Example: Create a workflow
export async function createWorkflow(
  userId: string,
  name: string,
  description?: string,
  nodes: Array<Record<string, unknown>> = [],
  edges: Array<Record<string, unknown>> = [],
) {
  const [newWorkflow] = await db
    .insert(workflows)
    .values({
      userId,
      name,
      description: description || null,
      nodes,
      edges,
      isActive: false,
    })
    .returning();

  return newWorkflow;
}

// Example: Get workflow executions
export async function getWorkflowExecutions(
  workflowId: string,
  limit = 10,
) {
  return await db
    .select()
    .from(workflowExecutions)
    .where(eq(workflowExecutions.workflowId, workflowId))
    .orderBy(desc(workflowExecutions.startedAt))
    .limit(limit);
}

// Example: Create a connection
export async function createConnection(
  userId: string,
  appName: string,
  credentials: Record<string, unknown>,
) {
  const [newConnection] = await db
    .insert(connections)
    .values({
      userId,
      appName,
      credentials,
      isActive: true,
    })
    .returning();

  return newConnection;
}

