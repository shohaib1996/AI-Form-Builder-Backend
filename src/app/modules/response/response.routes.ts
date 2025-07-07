import express from 'express';
import {
  submitResponse,
  getResponses,
  getSingleResponse,
} from './response.controller';
import validateRequest from '../../middlewares/validateRequest';
import { submitResponseSchema } from './response.validation';

const router = express.Router();

// Submit new response
router.post(
  '/:formId/responses',
  validateRequest(submitResponseSchema),
  submitResponse,
);

// Get all responses for a form
router.get('/:formId/responses', getResponses);

// Get single response by ID
router.get('/single/:responseId', getSingleResponse);

export default router;
