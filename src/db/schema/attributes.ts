import {
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export const attributesTable = pgTable(
  "attributes",
  {
    id: serial("id").primaryKey(),

    name: text("name")
      .notNull()
      .unique(),
  }
);