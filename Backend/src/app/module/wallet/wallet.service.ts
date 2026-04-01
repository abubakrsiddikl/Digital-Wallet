import { prisma } from "../../utils/prisma";
import AppError from "../../errorHelper/AppError";
import httpStatus from "http-status-codes";

const getMyWallet = async (userId: string) => {
  const wallet = await prisma.wallet.findUniqueOrThrow({
    where: { userId },
  });

  return wallet;
};

// get any wallet by userId (Admin only)
const getWalletByUserId = async (userId: string) => {
  const wallet = await prisma.wallet.findUniqueOrThrow({
    where: { userId },
    include: {
      user: {
        omit: { password: true },
      },
    },
  });

  return wallet;
};

// get system wallet (Admin only)
const getSystemWallet = async () => {
  const wallet = await prisma.wallet.findFirstOrThrow({
    where: { id: "SYSTEM_WALLET", type: "SYSTEM" },
  });
  return wallet;
};

const toggleBlockWallet = async (userId: string) => {
  const wallet = await prisma.wallet.findUniqueOrThrow({
    where: { userId },
  });

  const updatedWallet = await prisma.wallet.update({
    where: { userId },
    data: { isBlocked: !wallet.isBlocked },
  });

  return updatedWallet;
};

export const WalletServices = {
  getMyWallet,
  getWalletByUserId,
  getSystemWallet,
  toggleBlockWallet,
};
