import { INVALID, REQUIRED } from 'src/constants';
import { z } from 'zod';

export const createOrderFeedbackSchema = z
  .object({
    orderId: z.string().cuid(),
    feedbackComment: z
      .string()
      .min(1, REQUIRED.FIELD)
      .max(255, REQUIRED.MAX(255)),
    feedbackStars: z.number().min(1, INVALID.RATING).max(5, INVALID.RATING),
    deliveryFeedbackComment: z
      .string()
      .min(1, REQUIRED.FIELD)
      .max(255, REQUIRED.MAX(255)),
    deliveryFeedbackStars: z
      .number()
      .min(1, INVALID.RATING)
      .max(5, INVALID.RATING),
  })
  .required();

export type CreateOrderFeedbackDto = z.infer<typeof createOrderFeedbackSchema>;
