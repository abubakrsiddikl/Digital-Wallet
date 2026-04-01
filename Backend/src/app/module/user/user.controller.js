import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
// ─── Create User ─────────────────────────────────────────────
const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: result,
    });
});
// ─── Get All Users ────────────────────────────────────────────
const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: result,
    });
});
// ─── Get Single User ──────────────────────────────────────────
const getMyProfile = catchAsync(async (req, res) => {
    const result = await UserServices.getMyProfile(req.user?.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User fetched successfully",
        data: result,
    });
});
// ─── Update User ──────────────────────────────────────────────
const updateUser = catchAsync(async (req, res) => {
    const verifiedUserRole = req.user?.role;
    const result = await UserServices.updateUser(req.params.id, req.body, verifiedUserRole);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User updated successfully",
        data: result,
    });
});
// ─── Delete User ──────────────────────────────────────────────
const deleteUser = catchAsync(async (req, res) => {
    const result = await UserServices.deleteUser(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});
export const UserControllers = {
    createUser,
    getAllUsers,
    getMyProfile,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map