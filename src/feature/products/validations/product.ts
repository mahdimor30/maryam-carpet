import z from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(3),

  slug: z.string().min(3),

  description: z.string(),

  price: z.number().positive(),

  stock: z.number().min(0),

  categoryId: z.number(),
})
