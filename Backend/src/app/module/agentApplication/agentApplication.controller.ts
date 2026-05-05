import { Request, Response } from "express";
import httpStatus from "http-status-codes";


import { AgentApplicationServices } from "./agentApplication.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import pick from "../../utils/pick";

// ─── POST apply as agent
const applyAsAgent = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await AgentApplicationServices.applyAsAgent(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Agent application submitted successfully",
    data: result,
  });
});

// ─── GET my application status
const getMyApplicationStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await AgentApplicationServices.getMyApplicationStatus(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Application status fetched",
    data: result,
  });
});

// ─── GET all applications by admin
const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["status", "searchTerm"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await AgentApplicationServices.getAllApplications(filters as any, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Applications fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

// ─── PATCH approve or reject application by admin
const approveApplication = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.user?.id as string;
  const { id } = req.params;

  const { status, reviewNote } = req.body; // status: "APPROVE" | "REJECT"

  const result = await AgentApplicationServices.approveApplication(
    id as string,
    adminId,
    status,
    reviewNote
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Application ${status === "APPROVE" ? "approved" : "rejected"} successfully`,
    data: result,
  });
});

// ─── POST request balance by agent
const requestBalance = catchAsync(async (req: Request, res: Response) => {
  const agentId = req.user?.id as string;
  const result = await AgentApplicationServices.requestBalance(agentId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Balance request submitted successfully",
    data: result,
  });
});

// ─── GET all balance requests by admin
const getAllBalanceRequests = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["status"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await AgentApplicationServices.getAllBalanceRequests(
    filters as any,
    options
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Balance requests fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

// ─── PATCH approve or reject balance request by admin
const approveBalanceRequest = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.user?.id as string;
  const { id } = req.params;
  const { status, reviewNote } = req.body;

  const result = await AgentApplicationServices.approveBalanceRequest(
    id as string,
    adminId,
    status,
    reviewNote
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Balance request ${status === "APPROVE" ? "approved" : "rejected"} successfully`,
    data: result,
  });
});

export const AgentApplicationControllers = {
  applyAsAgent,
  getMyApplicationStatus,
  getAllApplications,
  approveApplication,
  requestBalance,
  getAllBalanceRequests,
  approveBalanceRequest,
};
