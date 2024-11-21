import { INVALID, REQUIRED } from 'src/constants';
import { REGEX } from 'src/utils/regex';
import { z } from 'zod';

export const createCreditCardSchema = z
  .object({
    cardNumber: z
      .string()
      .min(1, REQUIRED.FIELD)
      .min(16, REQUIRED.MIN(16))
      .max(16, REQUIRED.MAX(16))
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
    cpf: z
      .string()
      .min(1, REQUIRED.FIELD)
      .min(11, REQUIRED.MIN(11))
      .max(11, REQUIRED.MAX(11))
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
    cvv: z
      .string()
      .min(1, REQUIRED.FIELD)
      .min(3, REQUIRED.MIN(3))
      .max(3, REQUIRED.MAX(3))
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
    expirationDate: z
      .string()
      .min(1, REQUIRED.FIELD)
      .regex(new RegExp(REGEX.EXPIRATION_DATE), INVALID.EXPIRATION_DATE),
  })
  .required();

export type CreateCreditCardDto = z.infer<typeof createCreditCardSchema>;
