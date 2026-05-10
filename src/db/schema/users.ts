import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),

    fullName: text("full_name"),

    phone: text("phone")
      .notNull()
      .unique(),

    email: text("email").unique(),

    password: text("password"),

    role: text("role")
      .default("customer")
      .notNull(),

    isActive: boolean("is_active")
      .default(true)
      .notNull(),

    phoneVerified: boolean(
      "phone_verified"
    )
      .default(false)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);