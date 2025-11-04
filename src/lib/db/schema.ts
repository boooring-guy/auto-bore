import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { generateId } from "../utils";

export { user, session, account, verification } from "./auth-schema";

export const workflows = pgTable("workflows", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateId("workflows")),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
