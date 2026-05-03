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

export const StatsControllers = {
  getAgentStats,
};
