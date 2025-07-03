import { Request, Response } from 'express';
import * as ResponseService from './response.services';

export const submitResponse = async (req: Request, res: Response) => {
  const { formId } = req.params;
  const { answers } = req.body;

  try {
    // (Optional) validate form existence here if needed
    const newResponse = await ResponseService.createResponse(formId, answers);
    res.status(201).json({ success: true, data: newResponse });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getResponses = async (req: Request, res: Response) => {
  const { formId } = req.params;

  try {
    const responses = await ResponseService.getResponses(formId);
    res.status(200).json({ success: true, data: responses });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getSingleResponse = async (req: Request, res: Response) => {
  const { responseId } = req.params;

  try {
    const response = await ResponseService.getSingleResponse(responseId);
    if (!response) {
      res.status(404).json({ success: false, message: 'Response not found' });
      return;
    }
    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Unknown error' });
  }
};
