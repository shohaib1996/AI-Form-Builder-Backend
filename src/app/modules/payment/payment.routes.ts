import express from 'express';
import {
  cancel,
  checkout,
  complete,
  getSubscription,
} from './payment.controller';
import { auth } from '../../middlewares/auth';
import { userRoles } from '../users/user.constant';

const router = express.Router();

router.post('/checkout', auth([userRoles.USER, userRoles.ADMIN]), checkout);
router.get('/complete', complete);
router.get('/cancel', cancel);
router.get(
  '/subscription',
  auth([userRoles.ADMIN, userRoles.USER]),
  getSubscription,
);

export default router;
