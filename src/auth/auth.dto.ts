import { INVALID, REQUIRED } from 'src/constants';
import { z } from 'zod';

export const signInSchema = z
  .object({
    email: z.string().min(1, REQUIRED.FIELD).email(INVALID.EMAIL),
    password: z.string().min(1, REQUIRED.FIELD),
  })
  .required();

export type SignInDto = z.infer<typeof signInSchema>;
