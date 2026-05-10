import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const otpCodesTable = pgTable(
  "otp_codes",
  {
    id: serial("id").primaryKey(),

    phone: text("phone").notNull(),

    code: text("code").notNull(),

    expiresAt: timestamp("expires_at")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);