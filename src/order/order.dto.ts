import { REQUIRED } from 'src/constants';
import { z } from 'zod';

export const createOrderSchema = z
  .object({
    addressId: z.string().min(1, REQUIRED.FIELD),
    paymentMethod: z.string().min(1, REQUIRED.FIELD),
    products: z
      .array(
        z.object({
          id: z.string().cuid().min(1, REQUIRED.FIELD),
          quantity: z.number().int().min(1, REQUIRED.MIN(1)),
        }),
      )
      .min(1, REQUIRED.MIN(1)),
  })
  .required();

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

export enum ORDER_STATUS {
  PENDING = 'pending',
  IN_PREPARATION = 'in_preparation',
  ON_THE_WAY = 'on_the_way',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}