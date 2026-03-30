import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";

export const router: Router = Router();

interface IModuleRoute {
  path: string;
  route: Router;
}

const modulesRoutes: IModuleRoute[] = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
