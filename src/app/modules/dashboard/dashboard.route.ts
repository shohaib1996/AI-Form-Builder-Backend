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

router.get(
  '/admin-stats',
  auth([userRoles.ADMIN]),
  DashboardController.getAdminDashboardStats,
);

router.get(
  '/admin/user-growth',
  auth([userRoles.ADMIN]),
  DashboardController.getUserGrowthForAdmin,
);

router.get(
  '/admin/plan-distribution',
  auth([userRoles.ADMIN]),
  DashboardController.getPlanDistributionForAdmin,
);

router.get(
  '/admin/form-creation-trend',
  auth([userRoles.ADMIN]),
  DashboardController.getFormCreationTrendForAdmin,
);

router.get(
  '/admin/response-submission-trend',
  auth([userRoles.ADMIN]),
  DashboardController.getResponseSubmissionTrendForAdmin,
);

export default router;
