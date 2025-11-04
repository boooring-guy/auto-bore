import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { generateId } from "../utils";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export { user, session, account, verification } from "./auth-schema";

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
);

/**
 * Relationships
 */
export const workflowRelations = relations(workflows, ({ one }) => ({
  // workflow belongs to a single user
  user: one(user, {
    fields: [workflows.userId],
    references: [user.id],
  }),
}));
