import {
  pgTable,
  text,
  timestamp,
  index,
  pgEnum,
  jsonb,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { generateId } from "../utils"
import { user } from "./auth-schema"
import { InferSelectModel, relations } from "drizzle-orm"
import { createSelectSchema } from "drizzle-zod"
import { NodeType } from "./NodeType"
export { user, session, account, verification } from "./auth-schema"

export const workflows = pgTable(
  "workflows",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateId("workflows")),
    name: text("name").notNull(),
    description: text("description"),
    userId: text("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("idx_workflows_user_id").on(table.userId)]
)

export const nodeType = pgEnum("node_type", [
  NodeType.INITIAL,
  NodeType.ACTION,
  NodeType.CONDITION,
  NodeType.LOOP,
])

export const nodes = pgTable(
  "nodes",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateId("nodes")),
    workflowId: text("workflow_id")
      .references(() => workflows.id, { onDelete: "cascade" })
      .notNull(),
    name: text("name").notNull(),
    type: nodeType("type").notNull().default(NodeType.INITIAL),
    position: jsonb("position").notNull(),
    data: jsonb("data").default({}).notNull(),

    // time
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("idx_nodes_workflow_id").on(table.workflowId)]
)

export const connections /* edges */ = pgTable(
  "connections",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => generateId("connections")),
    workflowId: text("workflow_id")
      .references(() => workflows.id, { onDelete: "cascade" })
      .notNull(),
    fromNodeId: text("from_node_id")
      .references(() => nodes.id, { onDelete: "cascade" })
      .notNull(),
    toNodeId: text("to_node_id")
      .references(() => nodes.id, { onDelete: "cascade" })
      .notNull(),
    fromOutput: text("from_output").notNull(),
    toInput: text("to_input").notNull(),

    // time
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("idx_connections_unique").on(
      table.fromNodeId,
      table.toNodeId,
      table.fromOutput,
      table.toInput
    ),
    index("idx_connections_workflow_id").on(table.workflowId),
    index("idx_connections_from_node_id").on(table.fromNodeId),
    index("idx_connections_to_node_id").on(table.toNodeId),
  ]
)

/**
 * Relationships
 */
export const workflowRelations = relations(workflows, ({ one, many }) => ({
  // workflow belongs to a single user
  user: one(user, {
    fields: [workflows.userId],
    references: [user.id],
  }),
  nodes: many(nodes),
  connections: many(connections),
}))

export const nodeRelations = relations(nodes, ({ many, one }) => ({
  /* node has many connections */
  connections: many(connections),
  /* node belongs to a single workflow */
  workflow: one(workflows, {
    fields: [nodes.workflowId],
    references: [workflows.id],
  }),
}))
export const connectionRelations = relations(connections, ({ one }) => ({
  /* connection belongs to a workflow */
  workflow: one(workflows, {
    fields: [connections.workflowId],
    references: [workflows.id],
  }),
  /* edge starts from a node */
  fromNode: one(nodes, {
    fields: [connections.fromNodeId],
    references: [nodes.id],
  }),
  /* edge ends at a node */
  toNode: one(nodes, {
    fields: [connections.toNodeId],
    references: [nodes.id],
  }),
}))

export const WorkflowSelectSchema = createSelectSchema(workflows)
export type Workflow = InferSelectModel<typeof workflows>
