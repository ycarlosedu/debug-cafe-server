import { USER_TYPE } from '@prisma/client';
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
    fullName: z.string().min(1, REQUIRED.FIELD).min(5, REQUIRED.MIN(5)),
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
  userType: USER_TYPE;
};

export const changeUserTypeSchema = z
  .object({
    userType: z.nativeEnum(USER_TYPE, {
      message: INVALID.USER_TYPE,
    }),
    password: z.string().min(1, REQUIRED.FIELD),
  })
  .required();

export type ChangeUserTypeDto = z.infer<typeof changeUserTypeSchema>;
