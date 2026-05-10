import {
  pgTable,
  serial,
  integer,
} from "drizzle-orm/pg-core";

import { productVariantsTable } from "./product-variants";

import { attributeValuesTable } from "./attribute-values";

export const variantAttributeValuesTable =
  pgTable(
    "variant_attribute_values",
    {
      id: serial("id").primaryKey(),

      variantId: integer("variant_id")
        .references(
          () => productVariantsTable.id
        )
        .notNull(),

      attributeValueId: integer(
        "attribute_value_id"
      )
        .references(
          () => attributeValuesTable.id
        )
        .notNull(),
    }
  );