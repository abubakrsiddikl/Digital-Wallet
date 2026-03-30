import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

// ─── Create User ─────────────────────────────────────────────
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// ─── Get All Users ────────────────────────────────────────────
// শুধু Admin দেখতে পারবে সব user
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

// ─── Get Single User ──────────────────────────────────────────
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserById(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

// ─── Update User ──────────────────────────────────────────────
// role update শুধু Admin করতে পারবে — সেটা service এ check হবে
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const requestedBy = req.body.requestedBy as { role: string };

  const result = await UserServices.updateUser(
    req.params.id as string,
    req.body,
    requestedBy.role,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

// ─── Delete User ──────────────────────────────────────────────
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.deleteUser(req.params.id as string);

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
  getUserById,
  updateUser,
  deleteUser,
};
