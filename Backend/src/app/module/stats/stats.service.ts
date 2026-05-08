import { Decimal } from "@prisma/client/runtime/client";
import { prisma } from "../../utils/prisma";

const toNumber = (d: Decimal | null | undefined): number =>
  d ? parseFloat(d.toString()) : 0;

const getAgentStats = async (userId: string) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

 
  const [cashInAgg, cashOutAgg, todayCommAgg, totalCommAgg, txCount, recent] =
    await Promise.all([
      // Total cash in amount (agent is sender)
      prisma.transaction.aggregate({
        where: {
          senderId: userId,
          type: "CASH_IN",
          status: "SUCCESS",
        },
        _sum: { amount: true },
      }),

      // Total cash out amount (agent is receiver)
      prisma.transaction.aggregate({
        where: {
          receiverId: userId,
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

const getAdminStats = async () => {
  // Run all queries in parallel
  const [
    totalUsers,
    totalAgents,
    transactionAgg,
    pendingAgentRequests,
    recentTransactions,
  ] = await Promise.all([
    // ── Total regular users
    prisma.user.count({
      where: { role: "USER" },
    }),

    // ── Total approved agents
    prisma.user.count({
      where: { role: "AGENT" },
    }),

    // ── Total txn count + volume + systemCommission
    prisma.transaction.aggregate({
      where: { status: "SUCCESS" },
      _count: { id: true },
      _sum: {
        amount: true,
        systemCommission: true,
      },
    }),

    // ── Pending balance requests (AGENT → ADMIN)
    prisma.user.count({
      where: { role: "AGENT", isApproved: false },
    }),

    // ── Last 10 transactions
    prisma.transaction.findMany({
      where: { status: "SUCCESS" },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
          },
        },
      },
    }),
  ]);

  // ── Shape recent transactions to match ITransaction ────────
  const shapedTransactions = recentTransactions.map((tx) => ({
    id: tx.id,
    transactionId: tx.transactionId,
    amount: tx.amount.toString(),
    fee: tx.fee.toString(),
    agentCommission: tx.agentCommission.toString(),
    systemCommission: tx.systemCommission.toString(),
    type: tx.type,
    status: tx.status,
    createdAt: tx.createdAt.toISOString(),
    updatedAt: tx.updatedAt.toISOString(),
    from: {
      id: tx.sender.id,
      name: tx.sender.name,
      email: tx.sender.email,
      phone: tx.sender.phone,
      role: tx.sender.role,
    },
    to: {
      id: tx.receiver.id,
      name: tx.receiver.name,
      email: tx.receiver.email,
      phone: tx.receiver.phone,
      role: tx.receiver.role,
    },
  }));

  return {
    totalUsers,
    totalAgents,
    totalTransactions: transactionAgg._count.id,
    totalVolume: Number(transactionAgg._sum.amount ?? 0),
    totalSystemCommission: Number(transactionAgg._sum.systemCommission ?? 0),
    pendingAgentRequests,
    recentTransactions: shapedTransactions,
  };
};

const getSystemStats = async () => {
  const wallets = await prisma.wallet.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          image: true,
          status: true,
          isApproved: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  const balanceAgg = await prisma.wallet.groupBy({
    by: ["userId"],
    _sum: {
      balance: true,
    },
  });

  let totalUserBalance = 0;
  let totalAgentBalance = 0;
  let totalSystemBalance = 0;

  wallets.forEach((wallet) => {
    const balance = Number(wallet.balance);
    if (wallet.user?.role === "USER") {
      totalUserBalance += balance;
    } else if (wallet.user?.role === "AGENT") {
      totalAgentBalance += balance;
    } else if (wallet.user?.role === "ADMIN") {
      totalSystemBalance += balance;
    }
  });

  const transactionAgg = await prisma.transaction.aggregate({
    where: { status: "SUCCESS" },
    _sum: {
      systemCommission: true,
    },
  });

  const formattedWallets = wallets.map((w) => ({
    id: w.id,
    user: w.user,
    balance: w.balance.toString(),
    isBlocked: w.user?.status === "BLOCKED",
    type: w.user?.role,
    createdAt: w.createdAt.toISOString(),
    updatedAt: w.updatedAt.toISOString(),
  }));

  return {
    totalSystemBalance: Number(totalSystemBalance.toFixed(2)),
    totalUserBalance: Number(totalUserBalance.toFixed(2)),
    totalAgentBalance: Number(totalAgentBalance.toFixed(2)),
    totalCommissionEarned: Number(
      (transactionAgg._sum.systemCommission ?? 0).toFixed(2),
    ),
    wallets: formattedWallets,
  };
};

export const StatsServices = { getAgentStats, getAdminStats, getSystemStats };
