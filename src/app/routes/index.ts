
import { Router } from "express";
import UserRoutes from "./../modules/users/user.route";
import FormRoutes from "./../modules/form/form.route";
import path from "path";


const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/form",
    route: FormRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
