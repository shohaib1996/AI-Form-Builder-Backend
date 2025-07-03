import { z } from 'zod';

export const submitResponseSchema = z.object({
  body: z.object({
    answers: z
      .record(z.any(), z.any())
      .refine((val) => Object.keys(val).length > 0, {
        message: 'Answers are required',
      }),
  }),
});
