import { INVALID, REQUIRED } from 'src/constants';
import { z } from 'zod';

export const createOrderFeedbackSchema = z
  .object({
    orderId: z.string().cuid(),
    comment: z.string().max(255, REQUIRED.MAX(255)).optional(),
    stars: z.number().min(1, INVALID.RATING).max(5, INVALID.RATING),
    deliveryComment: z.string().max(255, REQUIRED.MAX(255)).optional(),
    deliveryStars: z.number().min(1, INVALID.RATING).max(5, INVALID.RATING),
  })
  .required({
    orderId: true,
    stars: true,
    deliveryStars: true,
  });

export type CreateOrderFeedbackDto = z.infer<typeof createOrderFeedbackSchema>;
