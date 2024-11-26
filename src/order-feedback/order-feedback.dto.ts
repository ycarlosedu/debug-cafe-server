import { INVALID, REQUIRED } from 'src/constants';
import { z } from 'zod';

export const createOrderFeedbackSchema = z
  .object({
    orderId: z.string().cuid(),
    comment: z.string().min(1, REQUIRED.FIELD).max(255, REQUIRED.MAX(255)),
    stars: z.number().min(1, INVALID.RATING).max(5, INVALID.RATING),
    deliveryComment: z
      .string()
      .min(1, REQUIRED.FIELD)
      .max(255, REQUIRED.MAX(255)),
    deliveryStars: z.number().min(1, INVALID.RATING).max(5, INVALID.RATING),
  })
  .required();

export type CreateOrderFeedbackDto = z.infer<typeof createOrderFeedbackSchema>;
