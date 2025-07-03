
import { Router } from "express";
import UserRoutes from "./../modules/users/user.route";
import FormRoutes from "./../modules/form/form.route";
import ResponseRoutes from "./../modules/response/response.routes";



const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/form",
    route: FormRoutes,
  },
  {
    path: "/response",
    route: ResponseRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
