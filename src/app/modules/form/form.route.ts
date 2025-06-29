import express from 'express';
import {
  createFormWithAI,
} from './form.controller';
import { aiFormSchema, formValidationSchema } from './form.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// Create form manually
// router.post('/', auth(), validateRequest(formValidationSchema), createForm);

// Create form using AI
router.post('/ai', validateRequest(aiFormSchema), createFormWithAI);

// Get all forms (of current user)
// router.get('/', auth(), getAllForms);

// Get single form by id
// router.get('/:id', auth(), getFormById);

// Update form
// router.patch('/:id', auth(), validateRequest(formValidationSchema), updateForm);

// Delete form
// router.delete('/:id', auth(), deleteForm);

// Toggle publish/unpublish form
// router.patch('/:id/publish', auth(), togglePublishForm);

export default router;
