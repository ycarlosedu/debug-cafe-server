import { REQUIRED } from 'src/constants';
import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
    image: z.string().min(1, REQUIRED.FIELD),
    price: z.number().min(0, REQUIRED.MIN(0)).max(9999, REQUIRED.MAX(9999)),
    description: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
    categories: z.array(z.string().cuid()).min(1, REQUIRED.MIN(1)),
  })
  .required();

export type CreateProductDto = z.infer<typeof createProductSchema>;

export const updateProductSchema = z
  .object({
    id: z.string().cuid(),
    name: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
    image: z.string().min(1, REQUIRED.FIELD),
    price: z.number().min(0, REQUIRED.MIN(0)).max(9999, REQUIRED.MAX(9999)),
    description: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
    categories: z.array(z.string().cuid()).min(1, REQUIRED.MIN(1)),
  })
  .required();

export type UpdateProductDto = z.infer<typeof updateProductSchema>;

export const searchProductSchema = z
  .object({
    name: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
    category: z.string().optional(),
  })
  .required({
    name: true,
  });

export type SearchProductDto = z.infer<typeof searchProductSchema>;
