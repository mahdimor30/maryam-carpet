import {
  pgTable,
  serial,
  integer,
  text,
} from "drizzle-orm/pg-core";

import { attributesTable } from "./attributes";

export const attributeValuesTable =
  pgTable("attribute_values", {
    id: serial("id").primaryKey(),

    attributeId: integer("attribute_id")
      .references(() => attributesTable.id)
      .notNull(),

    value: text("value").notNull(),
  });