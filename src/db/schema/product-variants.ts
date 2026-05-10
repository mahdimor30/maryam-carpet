import {
  pgTable,
  serial,
  integer,
  text,
} from "drizzle-orm/pg-core";

import { productsTable } from "./products";

export const productVariantsTable =
  pgTable("product_variants", {
    id: serial("id").primaryKey(),

    productId: integer("product_id")
      .references(() => productsTable.id)
      .notNull(),

    sku: text("sku")
      .notNull()
      .unique(),

    price: integer("price").notNull(),

    stock: integer("stock")
      .default(0)
      .notNull(),
  });