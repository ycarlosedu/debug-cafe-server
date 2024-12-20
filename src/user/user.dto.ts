import { INVALID, REQUIRED } from 'src/constants';
import { REGEX } from 'src/utils/regex';
import { z } from 'zod';

export const updateUserSchema = z
  .object({
    fullName: z.string().min(1, REQUIRED.FIELD).min(5, REQUIRED.MIN(5)),
    phone: z
      .string()
      .min(1, REQUIRED.FIELD)
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
  })
  .required();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
