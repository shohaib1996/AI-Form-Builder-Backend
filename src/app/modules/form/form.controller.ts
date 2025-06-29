import { Request, Response } from 'express';
import * as FormService from './form.services';

export const createFormWithAI = async (req: Request, res: Response) => {
  const { prompt, title, description } = req.body;
  const userId = '6860ac211adfd4e7160d605c';
  console.log(req.body);

  try {
    const fields = await FormService.generateFormFields(prompt);
    const form = await FormService.createForm({
      userId,
      title,
      description,
      fields,
      isPublished: false,
      templateId: 'ai-generated-template',
    });
    res.status(201).json({ success: true, data: form });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};
