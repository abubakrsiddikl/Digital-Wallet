import { Router } from "express";
import { StatsControllers } from "./stats.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/agent-stats",
  checkAuth(UserRole.AGENT),
  StatsControllers.getAgentStats,
);

export const StatsRoutes: Router = router;
