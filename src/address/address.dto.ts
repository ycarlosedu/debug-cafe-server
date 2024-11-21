import { INVALID, REQUIRED } from 'src/constants';
import { REGEX } from 'src/utils/regex';
import { z } from 'zod';

export const updateAddressSchema = z
  .object({
    cep: z
      .string()
      .min(1, REQUIRED.FIELD)
      .max(8, REQUIRED.MAX(8))
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
    city: z.string().min(1, REQUIRED.FIELD),
    street: z.string().min(1, REQUIRED.FIELD),
    number: z
      .string()
      .min(1, REQUIRED.FIELD)
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
  })
  .required();

export type UpdateAddressDto = z.infer<typeof updateAddressSchema>;
