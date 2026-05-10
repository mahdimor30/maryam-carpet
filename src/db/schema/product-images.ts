import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core'

import { productsTable } from './products'

export const productImagesTable = pgTable('product_images', {
  id: serial('id').primaryKey(),

  productId: integer('product_id')
    .references(() => productsTable.id)
    .notNull(),

  url: text('url').notNull(),

  alt: text('alt'),

  sortOrder: integer('sort_order').default(0).notNull(),
})
