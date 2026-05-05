import AppError from "../../errorHelper/AppError";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email, status: "ACTIVE" },
  });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found. Please create an account first.");
  }

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const { password, ...rest } = user;
  return rest;
};


export const AuthServices = {
  login,
};
