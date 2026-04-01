import { Router } from "express";
import { WalletControllers } from "./wallet.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";
const router = Router();
// User, Agent, Admin — self wallet details show
router.get("/my-wallet", checkAuth(UserRole.USER, UserRole.AGENT, UserRole.ADMIN), WalletControllers.getMyWallet);
// Admin view system wallet details
router.get("/system-wallet", checkAuth(UserRole.ADMIN), WalletControllers.getSystemWallet);
// Admin view all wallet details by userId
router.get("/:userId", checkAuth(UserRole.ADMIN), WalletControllers.getWalletByUserId);
// Admin — wallet block or unblock
router.patch("/:userId/toggle-block", checkAuth(UserRole.ADMIN), WalletControllers.toggleBlockWallet);
export const WalletRoutes = router;
//# sourceMappingURL=wallet.route.js.map