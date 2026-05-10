import {
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const brandsTable = pgTable(
  "brands",
  {
    id: serial("id").primaryKey(),

    title: text("title").notNull(),

    slug: text("slug")
      .notNull()
      .unique(),
  }
);