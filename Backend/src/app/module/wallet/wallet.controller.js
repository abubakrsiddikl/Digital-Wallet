import catchAsync from "../../utils/catchAsync";
import { WalletServices } from "./wallet.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
//
const getMyWallet = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await WalletServices.getMyWallet(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Wallet fetched successfully",
        data: result,
    });
});
// get any wallet by userId (Admin only)
const getWalletByUserId = catchAsync(async (req, res) => {
    const result = await WalletServices.getWalletByUserId(req.params.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Wallet fetched successfully",
        data: result,
    });
});
// get system wallet (Admin only)
const getSystemWallet = catchAsync(async (req, res) => {
    const result = await WalletServices.getSystemWallet();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "System wallet fetched successfully",
        data: result,
    });
});
// ─── Admin — Wallet Block/Unblock ─────────────────────────────
const toggleBlockWallet = catchAsync(async (req, res) => {
    const result = await WalletServices.toggleBlockWallet(req.params.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Wallet ${result.isBlocked ? "blocked" : "unblocked"} successfully`,
        data: result,
    });
});
export const WalletControllers = {
    getMyWallet,
    getWalletByUserId,
    getSystemWallet,
    toggleBlockWallet,
};
//# sourceMappingURL=wallet.controller.js.map