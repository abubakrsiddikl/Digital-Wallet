import express, { Router } from "express";
import { UserRole } from "@prisma/client";

import { AgentApplicationControllers } from "./agentApplication.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router: Router = express.Router();



// Apply to become agent (USER only)
router.post(
  "/apply",
  checkAuth(UserRole.USER),
  AgentApplicationControllers.applyAsAgent,
);

// Check own application status
router.get(
  "/apply/status",
  checkAuth(UserRole.USER, UserRole.AGENT),
  AgentApplicationControllers.getMyApplicationStatus,
);

// Request balance (AGENT only)
router.post(
  "/balance-request",
  checkAuth(UserRole.AGENT),
  AgentApplicationControllers.requestBalance,
);

//  Admin routes 

// Get all agent applications
router.get(
  "/admin/applications",
  checkAuth(UserRole.ADMIN),
  AgentApplicationControllers.getAllApplications,
);

// Approve or reject application
router.patch(
  "/admin/applications/:id/approve",
  checkAuth(UserRole.ADMIN),

  AgentApplicationControllers.approveApplication,
);

// Get all balance requests
router.get(
  "/admin/balance-requests",
  checkAuth(UserRole.ADMIN),
  AgentApplicationControllers.getAllBalanceRequests,
);

// Approve or reject balance request
router.patch(
  "/admin/balance-requests/:id/approve",
  checkAuth(UserRole.ADMIN),
  AgentApplicationControllers.approveBalanceRequest,
);

export const AgentApplicationRoutes: Router = router;
