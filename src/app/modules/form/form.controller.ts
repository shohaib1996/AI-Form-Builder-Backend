import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as FormService from './form.services';
import { AuthRequest } from '../../middlewares/auth';

// Extend Express Request interface to include 'user'
export const createFormWithAI: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { prompt, title, description } = req.body;
  if (!req.user || !req.user._id) {
    res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    return;
  }
  const userId = req.user._id;
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

export const getAllForms: RequestHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
   if (!req.user || !req.user._id) {
    res.status(401).json({ success: false, message: 'Unauthorized: User not found' });
    return;
  }
  const userId = req.user._id;
  try {
    const forms = await FormService.getAllForms(userId);
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const getFormById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const form = await FormService.getFormById(id);
    if (!form) {
      res.status(404).json({ success: false, message: 'Form not found' });
      return;
    }
    res.status(200).json({ success: true, data: form });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const updateForm: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const updatedForm = await FormService.updateForm(id, formData);
    if (!updatedForm) {
      res.status(404).json({ success: false, message: 'Form not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedForm });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const togglePublishForm: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const updatedForm = await FormService.togglePublishForm(id);
    if (!updatedForm) {
      res.status(404).json({ success: false, message: 'Form not found' });
      return;
    }
    res.status(200).json({ success: true, data: updatedForm });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};

export const deleteForm: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const deletedForm = await FormService.deleteForm(id);
    if (!deletedForm) {
      res.status(404).json({ success: false, message: 'Form not found' });
      return;
    }
    res.status(200).json({ success: true, data: deletedForm });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ success: false, message: errorMessage });
  }
};
