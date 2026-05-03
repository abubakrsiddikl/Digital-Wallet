import { Decimal } from "@prisma/client/runtime/client";
import { prisma } from "../../utils/prisma";

const toNumber = (d: Decimal | null | undefined): number =>
  d ? parseFloat(d.toString()) : 0;

const getAgentStats = async (userId: string) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [cashInAgg, cashOutAgg, todayCommAgg, totalCommAgg, txCount, recent] =
    await Promise.all([
      // Total cash in amount (agent is receiver)
      prisma.transaction.aggregate({
        where: {
          receiverId: userId,
          type: "CASH_IN",
          status: "SUCCESS",
        },
        _sum: { amount: true },
      }),

      // Total cash out amount (agent is sender)
      prisma.transaction.aggregate({
        where: {
          senderId: userId,
          type: "CASH_OUT",
          status: "SUCCESS",
        },
        _sum: { amount: true },
      }),

      // Today's commission (both cash in & cash out)
      prisma.transaction.aggregate({
        where: {
          OR: [{ receiverId: userId }, { senderId: userId }],
          type: { in: ["CASH_IN", "CASH_OUT"] },
          status: "SUCCESS",
          createdAt: { gte: todayStart },
        },
        _sum: { agentCommission: true },
      }),

      // Total commission (all time)
      prisma.transaction.aggregate({
        where: {
          OR: [{ receiverId: userId }, { senderId: userId }],
          type: { in: ["CASH_IN", "CASH_OUT"] },
          status: "SUCCESS",
        },
        _sum: { agentCommission: true },
      }),

      // Total transaction count
      prisma.transaction.count({
        where: {
          OR: [{ receiverId: userId }, { senderId: userId }],
          type: { in: ["CASH_IN", "CASH_OUT"] },
        },
      }),

      // Recent 5 transactions with user info
      prisma.transaction.findMany({
        where: {
          OR: [{ receiverId: userId }, { senderId: userId }],
          type: { in: ["CASH_IN", "CASH_OUT"] },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          transactionId: true,
          amount: true,
          agentCommission: true,
          systemCommission: true,
          fee: true,
          type: true,
          status: true,
          senderId: true,
          receiverId: true,
          createdAt: true,
          sender: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
              role: true,
            },
          },
          receiver: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true,
              role: true,
            },
          },
        },
      }),
    ]);

  // Shape recent transactions to match ITransaction interface
  const recentTransactions = recent.map((tx) => {
    const isCashIn = tx.type === "CASH_IN";
    return {
      id: tx.id,
      transactionId: tx.transactionId,
      amount: tx.amount.toString(),
      agentCommission: tx.agentCommission.toString(),
      systemCommission: tx.systemCommission.toString(),
      fee: tx.fee.toString(),
      type: tx.type,
      status: tx.status,
      direction: isCashIn ? "received" : "sent",
      from: tx.sender,
      to: tx.receiver,
      createdAt: tx.createdAt.toISOString(),
    };
  });

  const data = {
    totalCashIn: toNumber(cashInAgg._sum.amount),
    totalCashOut: toNumber(cashOutAgg._sum.amount),
    todayCommission: toNumber(todayCommAgg._sum.agentCommission),
    totalCommission: toNumber(totalCommAgg._sum.agentCommission),
    transactionCount: txCount,
    recentTransactions,
  };

  return data;
};

export const StatsServices = { getAgentStats };
