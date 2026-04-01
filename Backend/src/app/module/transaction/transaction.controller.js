import catchAsync from "../../utils/catchAsync";
import { TransactionServices } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
// ─── Send Money ───────────────────────────────────────────────
const sendMoney = catchAsync(async (req, res) => {
    const senderId = req.user?.id;
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
const cashIn = catchAsync(async (req, res) => {
    const agentId = req.user?.id;
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
const cashOut = catchAsync(async (req, res) => {
    const userId = req.user?.id;
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
const getMyTransactions = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await TransactionServices.getMyTransactions(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Transactions fetched successfully",
        data: result,
    });
});
// ─── Admin — All Transaction ───────────────────────────────────
const getAllTransactions = catchAsync(async (req, res) => {
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
//# sourceMappingURL=transaction.controller.js.map