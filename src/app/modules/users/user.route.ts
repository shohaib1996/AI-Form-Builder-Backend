import express from 'express';
import {
  signup,
  signin,
  updateProfile,
  resetPassword,
  getUserData,
} from './user.controller';
import {
  signupSchema,
  signinSchema,
  updateProfileSchema,
  resetPasswordSchema,
} from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { userRoles } from './user.constant';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/signin', validateRequest(signinSchema), signin);
router.get('/me', auth([userRoles.USER, userRoles.ADMIN]), getUserData);
router.patch(
  '/update/:id',
  validateRequest(updateProfileSchema),
  updateProfile,
);
router.post(
  '/reset-password/:id',
  validateRequest(resetPasswordSchema),
  resetPassword,
);

export default router;
