import { Router } from "express";
import { TransactionControllers } from "./transaction.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "@prisma/client";

const router = Router();

// User → User 
router.post("/send-money",checkAuth(UserRole.USER), TransactionControllers.sendMoney);

// Agent → User cash in
router.post("/cash-in", checkAuth(UserRole.AGENT), TransactionControllers.cashIn);

// User → Agent  (Cash Out)
router.post("/cash-out", checkAuth(UserRole.USER), TransactionControllers.cashOut);

// User, Agent, Admin — self transaction history show
router.get("/my-transactions", checkAuth(UserRole.USER,UserRole.ADMIN,UserRole.AGENT), TransactionControllers.getMyTransactions);

// Admin — all transaction history show
router.get("/", checkAuth(UserRole.ADMIN), TransactionControllers.getAllTransactions);

export const TransactionRoutes: Router = router;