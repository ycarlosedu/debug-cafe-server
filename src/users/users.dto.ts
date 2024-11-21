import { INVALID, REQUIRED } from 'src/constants';
import { REGEX } from 'src/utils/regex';
import { z } from 'zod';

export const updateUserSchema = z
  .object({
    fullName: z.string().min(1, REQUIRED.FIELD).min(10, REQUIRED.MIN(10)),
    phone: z
      .string()
      .min(1, REQUIRED.FIELD)
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.PHONE),
  })
  .required();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
