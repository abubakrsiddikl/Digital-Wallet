import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { StatsServices } from "./stats.service";

const getAgentStats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;

  const result = await StatsServices.getAgentStats(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Agent stats fetched successfully",

    data: result,
  });
});

// admin stats
const getAdminStats = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  const result = await StatsServices.getAdminStats();
 
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin stats fetched successfully",
    data: result,
  });
});
 

// get system stats
const getSystemStats = catchAsync(async (req: Request, res: Response) => {
  const result = await StatsServices.getSystemStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "System balance statistics fetched successfully",
    data: result,
  });
});



export const StatsControllers = {
  getAgentStats,
  getAdminStats,
  getSystemStats,
};
