import { AgentApplication } from "@prisma/client";
import AppError from "../../errorHelper/AppError";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { prisma } from "../../utils/prisma";
import httpStatus from "http-status-codes";

// agent apply
const applyAsAgent = async (
  userId: string,
  payload: AgentApplication
) => {
  // 1. Check user exists and is USER role
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { agentApplication: true },
  });

  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  if (user.role !== "USER") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Only regular users can apply to become an agent"
    );
  }

  const { userId: _, ...applicationData } = payload;

  // 2. Check no existing pending/approved application
  if (user.agentApplication) {
    const existing = user.agentApplication;
    if (existing.status === "PENDING") {
      throw new AppError(
        httpStatus.CONFLICT,
        "You already have a pending application"
      );
    }
    if (existing.status === "APPROVED") {
      throw new AppError(
        httpStatus.CONFLICT,
        "You are already an approved agent"
      );
    }
    // REJECTED — allow re-apply by updating
    const updated = await prisma.agentApplication.update({
      where: { userId },
      data: {
        ...payload,
        status: "PENDING",
        reviewedBy: null,
        reviewNote: null,
      },
    });
    return updated;
  }

  // 3. Create new application
  const application = await prisma.agentApplication.create({
    data: {
      userId,
      ...applicationData,
    },
  });

  return application;
};

// get my application status
const getMyApplicationStatus = async (userId: string) => {
  const application = await prisma.agentApplication.findUnique({
    where: { userId },
    select: {
      id: true,
      status: true,
      reviewNote: true,
      nidNumber: true,
      businessName: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return application;
};

// ─── GET all applications by admin
const getAllApplications = async (
  filters: { status?: string; searchTerm?: string },
  options: IOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andConditions: any[] = [];

  if (filters.status && filters.status !== "ALL") {
    andConditions.push({ status: filters.status });
  }

  if (filters.searchTerm) {
    andConditions.push({
      OR: [
        { nidNumber: { contains: filters.searchTerm } },
        { user: { name: { contains: filters.searchTerm, mode: "insensitive" } } },
        { user: { phone: { contains: filters.searchTerm } } },
        { user: { email: { contains: filters.searchTerm, mode: "insensitive" } } },
      ],
    });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const [applications, total] = await Promise.all([
    prisma.agentApplication.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            status: true,
            wallet: { select: { balance: true } },
          },
        },
      },
    }),
    prisma.agentApplication.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total },
    data: applications,
  };
};

// ─── PATCH approved or rejected by admin
const approveApplication = async (
  applicationId: string,
  adminId: string,
  status: "APPROVE" | "REJECT",
  reviewNote?: string
) => {
  // 1. Find application
  const application = await prisma.agentApplication.findUnique({
    where: { id: applicationId },
    include: { user: { include: { wallet: true } } },
  });

  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, "Application not found");
  }

  if (application.status !== "PENDING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Application is already ${application.status.toLowerCase()}`
    );
  }

  // 2. Run in transaction for data consistency
  const result = await prisma.$transaction(async (tx) => {
    // Update application status
    const updatedApp = await tx.agentApplication.update({
      where: { id: applicationId },
      data: {
        status: status === "APPROVE" ? "APPROVED" : "REJECTED",
        reviewedBy: adminId,
        reviewNote: reviewNote ?? null,
        updatedAt: new Date(),
      },
    });

    if (status === "APPROVE") {
      // Update user role → AGENT and isApproved → true
      await tx.user.update({
        where: { id: application.userId },
        data: {
          role: "AGENT",
          isApproved: true,
        },
      });

      // Update wallet type → AGENT
      if (application.user.wallet) {
        await tx.wallet.update({
          where: { userId: application.userId },
          data: { type: "AGENT" },
        });
      }
    }

    return updatedApp;
  });

  return result;
};

// ─── POST agent request balance top-up to admin
const requestBalance = async (
  agentId: string,
  payload: { amount: number; note?: string }
) => {
  // 1. Verify agent
  const agent = await prisma.user.findUnique({
    where: { id: agentId },
  });

  if (!agent || agent.role !== "AGENT") {
    throw new AppError(httpStatus.FORBIDDEN, "Only agents can request balance");
  }

  if (!agent.isApproved) {
    throw new AppError(httpStatus.FORBIDDEN, "Your agent account is not approved yet");
  }

  // 2. Check no duplicate PENDING request
  const existingPending = await prisma.balanceRequest.findFirst({
    where: { agentId, status: "PENDING" },
  });

  if (existingPending) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You already have a pending balance request. Please wait for admin review."
    );
  }

  // 3. Validate amount
  if (payload.amount < 100) {
    throw new AppError(httpStatus.BAD_REQUEST, "Minimum balance request is ৳100");
  }

  const request = await prisma.balanceRequest.create({
    data: {
      agentId,
      amount: payload.amount,
      note: payload.note,
    },
  });

  return request;
};

// ─── GET all balance requests by admin
const getAllBalanceRequests = async (
  filters: { status?: string },
  options: IOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const whereConditions: any = {};
  if (filters.status && filters.status !== "ALL") {
    whereConditions.status = filters.status;
  }

  const [requests, total] = await Promise.all([
    prisma.balanceRequest.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: { [sortBy || "createdAt"]: sortOrder || "desc" },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            wallet: { select: { balance: true, type: true } },
          },
        },
      },
    }),
    prisma.balanceRequest.count({ where: whereConditions }),
  ]);

  return {
    meta: { page, limit, total },
    data: requests,
  };
};

// ─── PATCH approve or reject balance request by admin
const approveBalanceRequest = async (
  requestId: string,
  adminId: string,
  status: "APPROVE" | "REJECT",
  reviewNote?: string
) => {
  // 1. Find request
  const request = await prisma.balanceRequest.findUnique({
    where: { id: requestId },
    include: {
      agent: { include: { wallet: true } },
    },
  });

  if (!request) {
    throw new AppError(httpStatus.NOT_FOUND, "Balance request not found");
  }

  if (request.status !== "PENDING") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Request is already ${request.status.toLowerCase()}`
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    // Update request status
    const updated = await tx.balanceRequest.update({
      where: { id: requestId },
      data: {
        status: status === "APPROVE" ? "APPROVED" : "REJECTED",
        reviewedBy: adminId,
        reviewNote: reviewNote ?? null,
        updatedAt: new Date(),
      },
    });

    if (status === "APPROVE") {
      // Agent wallet balance += requested amount
      await tx.wallet.update({
        where: { userId: request.agentId },
        data: {
          balance: {
            increment: request.amount,
          },
        },
      });
    }

    return updated;
  });

  return result;
};

export const AgentApplicationServices = {
  applyAsAgent,
  getMyApplicationStatus,
  getAllApplications,
  approveApplication,
  requestBalance,
  getAllBalanceRequests,
  approveBalanceRequest,
};
