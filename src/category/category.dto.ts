import { REQUIRED } from 'src/constants';
import { z } from 'zod';

export const createCategorySchema = z
  .object({
    name: z.string().min(1, REQUIRED.FIELD).max(30, REQUIRED.MAX(30)),
    image: z.string().min(1, REQUIRED.FIELD),
  })
  .required();

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z
  .object({
    id: z.string().cuid(),
    name: z.string().min(1, REQUIRED.FIELD).max(30, REQUIRED.MAX(30)),
    image: z.string().min(1, REQUIRED.FIELD),
  })
  .required();

export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
