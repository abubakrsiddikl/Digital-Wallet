import type { Prisma } from "@prisma/client";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";

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

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: { password: true },
    include: {
      wallet: true,
    },
  });

  return users;
};

//  Get Single User
const getUserById = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
    omit: { password: true },
    include: {
      wallet: true,
    },
  });

  return user;
};

//  Update User

const updateUser = async (
  id: string,
  userData: Prisma.UserUpdateInput,
  requestedByRole: string,
) => {
  if (userData.role && requestedByRole !== "ADMIN") {
    throw new Error("Only Admin can update user role");
  }

  //  if password sent in update request, then hash the password before updating
  if (userData.password && typeof userData.password === "string") {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  const user = await prisma.user.update({
    where: { id },
    data: userData,
    omit: { password: true },
  });

  return user;
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
  getUserById,
  updateUser,
  deleteUser,
};
