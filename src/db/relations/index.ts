import { relations } from 'drizzle-orm'

import { productsTable } from '../schema/products'
import { brandsTable } from '../schema/brands'
import { categoriesTable } from '../schema/categories'
import { productVariantsTable } from '../schema/product-variants'
import { productImagesTable } from '../schema/product-images'

import { variantAttributeValuesTable } from '../schema/variant-attribute-values'
import { attributeValuesTable } from '../schema/attribute-values'
import { attributesTable } from '../schema/attributes'

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),

  brand: one(brandsTable, {
    fields: [productsTable.brandId],
    references: [brandsTable.id],
  }),

  variants: many(productVariantsTable),

  images: many(productImagesTable),
}))

export const productVariantsRelations = relations(
  productVariantsTable,
  ({ one, many }) => ({
    product: one(productsTable, {
      fields: [productVariantsTable.productId],
      references: [productsTable.id],
    }),

    attributes: many(variantAttributeValuesTable),
  }),
)


export const productImagesRelations =
  relations(productImagesTable, ({ one }) => ({
    product: one(productsTable, {
      fields: [productImagesTable.productId],
      references: [productsTable.id],
    }),
  }));


  export const attributeValuesRelations =
  relations(
    attributeValuesTable,
    ({ one, many }) => ({
      attribute: one(attributesTable, {
        fields: [attributeValuesTable.attributeId],
        references: [attributesTable.id],
      }),

      variants: many(
        variantAttributeValuesTable
      ),
    })
  );




  export const variantAttributeValuesRelations =
  relations(
    variantAttributeValuesTable,
    ({ one }) => ({
      variant: one(productVariantsTable, {
        fields: [
          variantAttributeValuesTable.variantId,
        ],
        references: [productVariantsTable.id],
      }),

      attributeValue: one(
        attributeValuesTable,
        {
          fields: [
            variantAttributeValuesTable.attributeValueId,
          ],

          references: [attributeValuesTable.id],
        }
      ),
    })
  );