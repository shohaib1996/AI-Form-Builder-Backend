import express from 'express';
import {
  createFormWithAI,
  deleteForm,
  getAllForms,
  getFormById,
  togglePublishForm,
  updateForm,
} from './form.controller';
import { aiFormSchema, formValidationSchema } from './form.validation';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { userRoles } from '../users/user.constant';

const router = express.Router();

// Create form manually
// router.post('/', auth(), validateRequest(formValidationSchema), createForm);

// Create form using AI
router.post(
  '/ai',
  auth([userRoles.ADMIN, userRoles.USER]),
  validateRequest(aiFormSchema),
  createFormWithAI,
);

// Get all forms (of current user)
router.get('/', auth([userRoles.ADMIN, userRoles.USER]), getAllForms);

// Get single form by id
router.get('/:id', auth([userRoles.ADMIN, userRoles.USER]), getFormById);

// Update form
router.patch(
  '/:id',
  auth([userRoles.ADMIN, userRoles.USER]),
  validateRequest(formValidationSchema),
  updateForm,
);

// Toggle publish/unpublish form
router.patch(
  '/:id/publish',
  auth([userRoles.ADMIN, userRoles.USER]),
  togglePublishForm,
);

// Delete form
router.delete('/:id', auth([userRoles.ADMIN, userRoles.USER]), deleteForm);

export default router;
