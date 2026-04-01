import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TransactionServices } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

// ─── Send Money ───────────────────────────────────────────────
const sendMoney = catchAsync(async (req: Request, res: Response) => {
  const senderId = req.user?.id as string;
  const { receiverPhone, amount, pin } = req.body; // ID এর বদলে phone

  const result = await TransactionServices.sendMoney({
    senderId,
    receiverPhone,
    amount,
    pin,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Money sent successfully",
    data: result,
  });
});

// ─── Cash In ──────────────────────────────────────────────────
const cashIn = catchAsync(async (req: Request, res: Response) => {
  const agentId = req.user?.id as string;
  const { userPhone, amount, pin } = req.body; 

  const result = await TransactionServices.cashIn({
    agentId,
    userPhone,
    amount,
    pin,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cash in successful",
    data: result,
  });
});

// ─── Cash Out ─────────────────────────────────────────────────
const cashOut = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const { agentPhone, amount, pin } = req.body;

  const result = await TransactionServices.cashOut({
    userId,
    agentPhone,
    amount,
    pin,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cash out successful",
    data: result,
  });
});

// ─── My Transaction History ───────────────────────────────
const getMyTransactions = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const result = await TransactionServices.getMyTransactions(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Transactions fetched successfully",
    data: result,
  });
});

// ─── Admin — All Transaction ───────────────────────────────────
const getAllTransactions = catchAsync(async (req: Request, res: Response) => {
  const result = await TransactionServices.getAllTransactions();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All transactions fetched successfully",
    data: result,
  });
});

export const TransactionControllers = {
  sendMoney,
  cashIn,
  cashOut,
  getMyTransactions,
  getAllTransactions,
};
