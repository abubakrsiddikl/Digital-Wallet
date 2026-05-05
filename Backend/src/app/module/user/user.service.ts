import { UserRole, type Prisma } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";

//  Create User & wallet

const createUser = async (userData: Prisma.UserCreateInput) => {
  const hashPassword = await bcrypt.hash(userData.password, 10);

  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: { ...userData, password: hashPassword },
    });

    await tx.wallet.create({
      data: {
        userId: newUser.id,
        balance: 500,
      },
    });

    return newUser;
  });

  return user;
};

//  Get All Users

const getAllUsers = async (filters: any, options: IOptions) => {
  const { searchTerm, ...filterData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  // 🔥 where conditions
  const andConditions: any[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        { phone: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  // 🔥 filter (status)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const users = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    omit: { password: true },
    include: {
      wallet: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    data: users,
    meta: {
      page,
      limit,
      total,
    },
  };
};

//  Get Me
const getMyProfile = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    omit: { password: true },
    include: {
      wallet: true,
    },
  });

  return user;
};

// get All agents
const getAllAgents = async (filters: any, options: IOptions) => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andConditions: any[] = [{ role: UserRole.AGENT }];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { phone: { contains: searchTerm } },
        { email: { contains: searchTerm, mode: "insensitive" } },
      ],
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions = { AND: andConditions };

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      wallet: true,
    },
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    meta: { page, limit, total },
    data: result,
  };
};

//  Update User
const updateUser = async (
  id: string,
  userData: Prisma.UserUpdateInput,
  requestedByRole: string,
) => {
  const isUserExist = await prisma.user.findUnique({
    where: { id },
    include: { agentApplication: true },
  });

  if (!isUserExist) {
    throw new Error("User not found!");
  }

  if (userData.role && requestedByRole !== "ADMIN") {
    throw new Error("Only Admin can update user role");
  }

  if (userData.password && typeof userData.password === "string") {
    userData.password = await bcrypt.hash(userData.password, 12);
  }

  const updatePayload: Prisma.UserUpdateInput = { ...userData };

  if (userData.role === "USER") {
    updatePayload.wallet = {
      update: { type: "USER" },
    };

    if (isUserExist.agentApplication) {
      updatePayload.agentApplication = {
        update: { status: "REJECTED" },
      };
    }

    updatePayload.isApproved = false;
  }

  if (userData.role === "AGENT") {
    updatePayload.wallet = {
      update: { type: "AGENT" },
    };
    updatePayload.isApproved = true;
  }

  const result = await prisma.user.update({
    where: { id },
    data: updatePayload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      isApproved: true,
      wallet: true,
    },
  });

  return result;
};

//  Delete User future work

const deleteUser = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });

  return user;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getMyProfile,
  updateUser,
  deleteUser,
  getAllAgents,
};
