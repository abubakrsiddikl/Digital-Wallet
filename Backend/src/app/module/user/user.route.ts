import { Router } from "express";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

// create user
router.post("/", UserControllers.createUser);
// get all users
router.get("/",checkAuth(UserRole.ADMIN), UserControllers.getAllUsers);
// get all agents
router.get("/agents",checkAuth(UserRole.ADMIN), UserControllers.getAllAgents);
// get my profile
router.get(
  "/me",
  checkAuth(...Object.values(UserRole)),
  UserControllers.getMyProfile,
);
// update user
router.patch("/:id",checkAuth(...Object.values(UserRole)), UserControllers.updateUser);
// delete user
router.delete("/:id", checkAuth(UserRole.ADMIN), UserControllers.deleteUser);

export const UserRoutes: Router = router;
