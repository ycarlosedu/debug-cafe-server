import { INVALID, REQUIRED } from 'src/constants';
import { REGEX } from 'src/utils/regex';
import { z } from 'zod';

export const signInSchema = z
  .object({
    email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
    password: z.string().min(1, REQUIRED.FIELD),
  })
  .required();

export type SignInDto = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    fullName: z.string().min(1, REQUIRED.FIELD).min(10, REQUIRED.MIN(10)),
    email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
    phone: z
      .string()
      .min(1, REQUIRED.FIELD)
      .regex(new RegExp(REGEX.ONLY_NUMBERS), INVALID.ONLY_NUMBERS),
    password: z
      .string()
      .min(1, REQUIRED.FIELD)
      .min(8, REQUIRED.MIN(8))
      .max(20, REQUIRED.MAX(20)),
  })
  .required();

export type SignUpDto = z.infer<typeof signUpSchema>;

export type UserToken = {
  id: string;
  email: string;
};
