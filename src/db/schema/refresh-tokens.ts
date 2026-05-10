import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const refreshTokensTable =
  pgTable("refresh_tokens", {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
      .references(() => usersTable.id)
      .notNull(),

    token: text("token")
      .notNull()
      .unique(),

    expiresAt: timestamp("expires_at")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  });