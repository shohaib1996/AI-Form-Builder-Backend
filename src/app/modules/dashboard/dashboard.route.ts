import express from 'express';
import { DashboardController } from './dashboard.controller';

import { userRoles } from '../users/user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/forms-per-month',
  auth([userRoles.ADMIN, userRoles.USER]),
  DashboardController.getFormsPerMonth,
);
router.get(
  '/responses-over-time',
  auth([userRoles.ADMIN, userRoles.USER]),
  DashboardController.getResponsesOverTime,
);
router.get(
  '/responses-by-form',
  auth([userRoles.ADMIN, userRoles.USER]),
  DashboardController.getResponsesByForm,
);
router.get(
  '/form-status',
  auth([userRoles.ADMIN, userRoles.USER]),
  DashboardController.getFormStatus,
);

export default router;
