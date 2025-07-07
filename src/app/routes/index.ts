import { Router } from 'express';
import UserRoutes from './../modules/users/user.route';
import FormRoutes from './../modules/form/form.route';
import ResponseRoutes from './../modules/response/response.routes';
import PaymentRoutes from './../modules/payment/payment.routes';
import DashboardRoutes from '../modules/dashboard/dashboard.route';
import GoogleAuthRoutes from "../modules/googleAuth/googleAuth.route"

const router = Router();

const moduleRoutes = [
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/form',
    route: FormRoutes,
  },
  {
    path: '/response',
    route: ResponseRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: "/auth",
    route: GoogleAuthRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
