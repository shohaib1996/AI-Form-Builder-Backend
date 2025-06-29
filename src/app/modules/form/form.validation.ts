import { z } from 'zod';

export const formValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'User ID is required',
    }),
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string().optional(),
    fields: z.array(z.any(), {
      required_error: 'Fields are required',
    }),
    isPublished: z.boolean().optional(),
    templateId: z.string().optional(),
  }),
});

export const aiFormSchema = z.object({
  body: z.object({
    prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
    title: z.string().min(3),
    description: z.string().optional(),
  }),
});
