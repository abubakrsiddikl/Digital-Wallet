import { Router } from "express";
import { StatsControllers } from "./stats.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

// agent stats
router.get(
  "/agent-stats",
  checkAuth(UserRole.AGENT),
  StatsControllers.getAgentStats,
);

// admin stats
router.get("/admin", checkAuth(UserRole.ADMIN), StatsControllers.getAdminStats);

// system stats
router.get("/system", checkAuth(UserRole.ADMIN), StatsControllers.getSystemStats);

export const StatsRoutes: Router = router;
