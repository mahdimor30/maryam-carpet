import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { brandsTable } from "./brands";
import { categoriesTable } from "./categories";

export const productsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),

    title: text("title").notNull(),

    slug: text("slug")
      .notNull()
      .unique(),

    description: text("description"),

    categoryId: integer("category_id")
      .references(() => categoriesTable.id)
      .notNull(),

    brandId: integer("brand_id")
      .references(() => brandsTable.id),

    isActive: boolean("is_active")
      .default(true)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  }
);