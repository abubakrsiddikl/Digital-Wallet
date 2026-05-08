import { prisma } from "../../utils/prisma";
import AppError from "../../errorHelper/AppError";
import httpStatus from "http-status-codes";
import { Decimal } from "@prisma/client/runtime/client";
import { TransactionType } from "@prisma/client";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { emitTransactionSuccess } from "../../socket/socketEmitter";

// ─── Fee calculation ──────────────────────────────────────────
const calculateFee = (amount: Decimal, type: string) => {
  if (type === "SEND_MONEY") return amount.mul(0.015);
  if (type === "CASH_OUT") return amount.mul(0.0185);
  return new Decimal(0);
};

const calculateAgentCommission = (fee: Decimal) => fee.mul(0.7);

// ─── PIN verify helper ────────────────────────────────────────

const verifyPin = async (userId: string, pin: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  const isPinValid = await bcrypt.compare(pin, user.password);
  if (!isPinValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid PIN");
  }
};

// // ─── Send Money (User → User) 
// const sendMoney = async ({
//   senderId,
//   receiverPhone,
//   amount,
//   pin,
// }: {
//   senderId: string;
//   receiverPhone: string;
//   amount: number;
//   pin: string;
// }) => {
//   const decimalAmount = new Decimal(amount);

//   // pin verify
//   await verifyPin(senderId, pin);

//   // console.log({receiverPhone})

//   const result = await prisma.$transaction(async (tx) => {
//     // ─── Step 1: Phone  receiver find ──────────────────
//     const receiver = await tx.user.findUnique({
//       where: { phone: receiverPhone },
//     });
//     // console.log("tx reciver",receiver)

//     if (!receiver) {
//       throw new AppError(httpStatus.NOT_FOUND, "Receiver not found");
//     }

//     if (receiver.id === senderId) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         "You cannot send money to yourself",
//       );
//     }

//     // ─── Step 2: Sender wallet check ─────────────────────────
//     const senderWallet = await tx.wallet.findUniqueOrThrow({
//       where: { userId: senderId },
//     });

//     if (senderWallet.isBlocked) {
//       throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");
//     }

//     const fee = calculateFee(decimalAmount, TransactionType.SEND_MONEY);
//     const totalDeduction = decimalAmount.add(fee);

//     if (senderWallet.balance.lessThan(totalDeduction)) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
//     }

//     // ─── Step 3: Receiver wallet check ───────────────────────
//     const receiverWallet = await tx.wallet.findUniqueOrThrow({
//       where: { userId: receiver.id },
//     });

//     if (receiverWallet.isBlocked) {
//       throw new AppError(httpStatus.FORBIDDEN, "Receiver wallet is blocked");
//     }

//     const transactionId = `TXN-${nanoid(6)}`;

//     // ─── Step 4: Balance update ───────────────────────────────
//     await tx.wallet.update({
//       where: { userId: senderId },
//       data: { balance: { decrement: totalDeduction } },
//     });

//     await tx.wallet.update({
//       where: { userId: receiver.id },
//       data: { balance: { increment: decimalAmount } },
//     });

//     // system wallet balance increase (fee)
//     const systemWallet = await tx.wallet.findFirstOrThrow({
//       where: { type: "SYSTEM" },
//     });

//     await tx.wallet.update({
//       where: { id: systemWallet.id },
//       data: { balance: { increment: fee } },
//     });

//     // ─── Step 5: Transaction record ───────────────────────────
//     const transaction = await tx.transaction.create({
//       data: {
//         senderId,
//         receiverId: receiver.id,
//         amount: decimalAmount,
//         fee,
//         agentCommission: 0,
//         systemCommission: fee,
//         type: TransactionType.SEND_MONEY,
//         status: "SUCCESS",
//         transactionId: transactionId,
//         initiatedBy: senderId,
//       },
//     });

//     return transaction;
//   });

//   return result;
// };

// // ─── Cash In (Agent → User) 

// const cashIn = async ({
//   agentId,
//   userPhone,
//   amount,
//   pin,
// }: {
//   agentId: string;
//   userPhone: string;
//   amount: number;
//   pin: string;
// }) => {
//   const decimalAmount = new Decimal(amount);

//   // agent pin verify
//   await verifyPin(agentId, pin);

//   const result = await prisma.$transaction(async (tx) => {
//     const user = await tx.user.findUnique({
//       where: { phone: userPhone },
//     });

//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, "User not found");
//     }

//     const agentWallet = await tx.wallet.findUniqueOrThrow({
//       where: { userId: agentId },
//     });

//     if (agentWallet.isBlocked) {
//       throw new AppError(httpStatus.FORBIDDEN, "Agent wallet is blocked");
//     }

//     if (agentWallet.balance.lessThan(decimalAmount)) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Insufficient agent balance");
//     }

//     const userWallet = await tx.wallet.findUniqueOrThrow({
//       where: { userId: user.id },
//     });

//     if (userWallet.isBlocked) {
//       throw new AppError(httpStatus.FORBIDDEN, "User wallet is blocked");
//     }
//     const transactionId = `TXN-${nanoid(6)}`;

//     // agent balance decrease, user balance increase
//     await tx.wallet.update({
//       where: { userId: agentId },
//       data: { balance: { decrement: decimalAmount } },
//     });

//     await tx.wallet.update({
//       where: { userId: user.id },
//       data: { balance: { increment: decimalAmount } },
//     });

//     const transaction = await tx.transaction.create({
//       data: {
//         senderId: agentId,
//         receiverId: user.id,
//         amount: decimalAmount,
//         fee: 0,
//         agentCommission: 0,
//         type: TransactionType.CASH_IN,
//         status: "SUCCESS",
//         transactionId: transactionId,
//         initiatedBy: agentId,
//       },
//     });

//     return transaction;
//   });

//   return result;
// };

// // ─── Cash Out (User → Agent) 

// const cashOut = async ({
//   userId,
//   agentPhone,
//   amount,
//   pin,
// }: {
//   userId: string;
//   agentPhone: string;
//   amount: number;
//   pin: string;
// }) => {
//   const decimalAmount = new Decimal(amount);

//   // user pin verify
//   await verifyPin(userId, pin);

//   const result = await prisma.$transaction(async (tx) => {
//     const agent = await tx.user.findUnique({
//       where: { phone: agentPhone },
//     });

//     if (!agent) {
//       throw new AppError(httpStatus.NOT_FOUND, "Agent not found");
//     }

//     if (agent.role !== "AGENT") {
//       throw new AppError(httpStatus.BAD_REQUEST, "This user is not an agent");
//     }

//     const userWallet = await tx.wallet.findUniqueOrThrow({
//       where: { userId },
//     });

//     if (userWallet.isBlocked) {
//       throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");
//     }

//     const fee = calculateFee(decimalAmount, TransactionType.CASH_OUT);
//     const agentCommission = calculateAgentCommission(fee);
//     const systemCommission = fee.sub(agentCommission);
//     const totalDeduction = decimalAmount.add(fee);

//     if (userWallet.balance.lessThan(totalDeduction)) {
//       throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");
//     }

//     const agentWallet = await tx.wallet.findUniqueOrThrow({
//       where: { userId: agent.id },
//     });

//     if (agentWallet.isBlocked) {
//       throw new AppError(httpStatus.FORBIDDEN, "Agent wallet is blocked");
//     }

//     const systemWallet = await tx.wallet.findFirstOrThrow({
//       where: { id: "SYSTEM_WALLET", type: "SYSTEM" },
//     });

//     const transactionId = `TXN-${nanoid(6)}`;

//     // user balance decrease,
//     await tx.wallet.update({
//       where: { userId },
//       data: { balance: { decrement: totalDeduction } },
//     });

//     // agent balance increase
//     await tx.wallet.update({
//       where: { userId: agent.id },
//       data: { balance: { increment: decimalAmount.add(agentCommission) } },
//     });

//     // system wallet balance increase
//     await tx.wallet.update({
//       where: { id: systemWallet.id, type: "SYSTEM" },
//       data: { balance: { increment: systemCommission } },
//     });

//     const transaction = await tx.transaction.create({
//       data: {
//         senderId: userId,
//         receiverId: agent.id,
//         amount: decimalAmount,
//         fee,
//         agentCommission,
//         systemCommission,
//         type: TransactionType.CASH_OUT,
//         status: "SUCCESS",
//         transactionId: transactionId,
//         initiatedBy: userId,
//       },
//     });

//     return transaction;
//   });

//   return result;
// };


// new socket implementation for transaction
const sendMoney = async ({
  senderId,
  receiverPhone,
  amount,
  pin,
}: {
  senderId: string;
  receiverPhone: string;
  amount: number;
  pin: string;
}) => {
  const decimalAmount = new Decimal(amount);
  await verifyPin(senderId, pin);

  const result = await prisma.$transaction(async (tx) => {
    const receiver = await tx.user.findUnique({
      where: { phone: receiverPhone },
    });

    if (!receiver) throw new AppError(httpStatus.NOT_FOUND, "Receiver not found");
    if (receiver.id === senderId) throw new AppError(httpStatus.BAD_REQUEST, "Self transfer not allowed");

    const senderWallet = await tx.wallet.findUniqueOrThrow({ where: { userId: senderId } });
    if (senderWallet.isBlocked) throw new AppError(httpStatus.FORBIDDEN, "Your wallet is blocked");

    const fee = calculateFee(decimalAmount, TransactionType.SEND_MONEY);
    const totalDeduction = decimalAmount.add(fee);

    if (senderWallet.balance.lessThan(totalDeduction)) throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance");

    const receiverWallet = await tx.wallet.findUniqueOrThrow({ where: { userId: receiver.id } });
    if (receiverWallet.isBlocked) throw new AppError(httpStatus.FORBIDDEN, "Receiver wallet is blocked");

    const transactionId = `TXN-${nanoid(6)}`;

    await tx.wallet.update({
      where: { userId: senderId },
      data: { balance: { decrement: totalDeduction } },
    });

    await tx.wallet.update({
      where: { userId: receiver.id },
      data: { balance: { increment: decimalAmount } },
    });

    const systemWallet = await tx.wallet.findFirstOrThrow({ where: { type: "SYSTEM" } });
    await tx.wallet.update({
      where: { id: systemWallet.id },
      data: { balance: { increment: fee } },
    });

    return await tx.transaction.create({
      data: {
        senderId,
        receiverId: receiver.id,
        amount: decimalAmount,
        fee,
        agentCommission: 0,
        systemCommission: fee,
        type: TransactionType.SEND_MONEY,
        status: "SUCCESS",
        transactionId,
        initiatedBy: senderId,
      },
    });
  });

  // Socket Emit: 
  await emitTransactionSuccess(result.id);

  return result;
};

// ─── Cash In (Agent → User) 
const cashIn = async ({
  agentId,
  userPhone,
  amount,
  pin,
}: {
  agentId: string;
  userPhone: string;
  amount: number;
  pin: string;
}) => {
  const decimalAmount = new Decimal(amount);
  await verifyPin(agentId, pin);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { phone: userPhone } });
    if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

    const agentWallet = await tx.wallet.findUniqueOrThrow({ where: { userId: agentId } });
    if (agentWallet.isBlocked || agentWallet.balance.lessThan(decimalAmount)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid agent status or insufficient balance");
    }

    const userWallet = await tx.wallet.findUniqueOrThrow({ where: { userId: user.id } });
    if (userWallet.isBlocked) throw new AppError(httpStatus.FORBIDDEN, "User wallet is blocked");

    const transactionId = `TXN-${nanoid(6)}`;

    await tx.wallet.update({
      where: { userId: agentId },
      data: { balance: { decrement: decimalAmount } },
    });

    await tx.wallet.update({
      where: { userId: user.id },
      data: { balance: { increment: decimalAmount } },
    });

    return await tx.transaction.create({
      data: {
        senderId: agentId,
        receiverId: user.id,
        amount: decimalAmount,
        fee: 0,
        agentCommission: 0,
        type: TransactionType.CASH_IN,
        status: "SUCCESS",
        transactionId,
        initiatedBy: agentId,
      },
    });
  });

  //  Socket Emit: Cash In 
  await emitTransactionSuccess(result.id);

  return result;
};

// ─── Cash Out (User → Agent) 
const cashOut = async ({
  userId,
  agentPhone,
  amount,
  pin,
}: {
  userId: string;
  agentPhone: string;
  amount: number;
  pin: string;
}) => {
  const decimalAmount = new Decimal(amount);
  await verifyPin(userId, pin);

  const result = await prisma.$transaction(async (tx) => {
    const agent = await tx.user.findUnique({ where: { phone: agentPhone } });
    if (!agent || agent.role !== "AGENT") throw new AppError(httpStatus.NOT_FOUND, "Valid agent not found");

    const userWallet = await tx.wallet.findUniqueOrThrow({ where: { userId } });
    const fee = calculateFee(decimalAmount, TransactionType.CASH_OUT);
    const totalDeduction = decimalAmount.add(fee);

    if (userWallet.isBlocked || userWallet.balance.lessThan(totalDeduction)) {
      throw new AppError(httpStatus.BAD_REQUEST, "Insufficient balance or blocked wallet");
    }

    const agentCommission = calculateAgentCommission(fee);
    const systemCommission = fee.sub(agentCommission);
    const transactionId = `TXN-${nanoid(6)}`;
    const systemWallet = await tx.wallet.findFirstOrThrow({ where: { type: "SYSTEM" } });

    await tx.wallet.update({
      where: { userId },
      data: { balance: { decrement: totalDeduction } },
    });

    await tx.wallet.update({
      where: { userId: agent.id },
      data: { balance: { increment: decimalAmount.add(agentCommission) } },
    });

    await tx.wallet.update({
      where: { id: systemWallet.id },
      data: { balance: { increment: systemCommission } },
    });

    return await tx.transaction.create({
      data: {
        senderId: userId,
        receiverId: agent.id,
        amount: decimalAmount,
        fee,
        agentCommission,
        systemCommission,
        type: TransactionType.CASH_OUT,
        status: "SUCCESS",
        transactionId,
        initiatedBy: userId,
      },
    });
  });

  //  Socket Emit: Cash Out 
  await emitTransactionSuccess(result.id);

  return result;
};

// ─── My Transaction History 
const getMyTransactions = async (
  userId: string,
  filters: any,
  options: IOptions,
) => {
  const { searchTerm, ...filterData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  // 🔥 where conditions
  const andConditions: any[] = [];

  // 🔥 user condition (must)
  andConditions.push({
    OR: [{ senderId: userId }, { receiverId: userId }],
  });

  // 🔥 search (name, phone, transactionId)
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          transactionId: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          sender: {
            name: { contains: searchTerm, mode: "insensitive" },
          },
        },
        {
          receiver: {
            name: { contains: searchTerm, mode: "insensitive" },
          },
        },
        {
          sender: {
            phone: { contains: searchTerm },
          },
        },
        {
          receiver: {
            phone: { contains: searchTerm },
          },
        },
      ],
    });
  }

  // 🔥 filter (type, status)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // 🔥 query
  const transactions = await prisma.transaction.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      sender: {
        select: {
          id: true,
          phone: true,
          name: true,
          email: true,
          role: true,
        },
      },
      receiver: {
        select: {
          id: true,
          phone: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  // 🔥 total count (pagination meta)
  const total = await prisma.transaction.count({
    where: whereConditions,
  });

  // 🔥 transform data
  const formatted = transactions.map((trx) => {
    const isSender = trx.senderId === userId;

    return {
      id: trx.id,
      transactionId: trx.transactionId,
      amount: trx.amount,
      fee: trx.fee,
      type: trx.type,
      agentCommission: trx.agentCommission,
      systemCommission: trx.systemCommission,
      status: trx.status,
      direction: isSender ? "sent" : "received",
      from: trx.sender,
      to: trx.receiver,
      createdAt: trx.createdAt,
    };
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: formatted,
  };
};

// ─── Admin — All Transaction 
const getAllTransactions = async (filters: any, options: IOptions) => {
  const { searchTerm, ...filterData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  // 🔥 where conditions
  const andConditions: any[] = [];

  // 🔥 search (name, phone, transactionId)
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          transactionId: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          sender: {
            name: { contains: searchTerm, mode: "insensitive" },
          },
        },
        {
          receiver: {
            name: { contains: searchTerm, mode: "insensitive" },
          },
        },
        {
          sender: {
            phone: { contains: searchTerm },
          },
        },
        {
          receiver: {
            phone: { contains: searchTerm },
          },
        },
      ],
    });
  }

  // 🔥 filter (type, status)
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const transactions = await prisma.transaction.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      sender: {
        select: {
          id: true,
          phone: true,
          name: true,
          email: true,
          role: true,
        },
      },
      receiver: {
        select: {
          id: true,
          phone: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  // 🔥 total count (pagination meta)
  const total = await prisma.transaction.count({
    where: whereConditions,
  });

  // 🔥 transform data (Admin doesn't need 'direction')
  const formatted = transactions.map((trx) => {
    return {
      id: trx.id,
      transactionId: trx.transactionId,
      amount: trx.amount,
      fee: trx.fee,
      type: trx.type,
      agentCommission: trx.agentCommission,
      systemCommission: trx.systemCommission,
      status: trx.status,
      from: trx.sender,
      to: trx.receiver,
      createdAt: trx.createdAt,
    };
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: formatted,
  };
};

export const TransactionServices = {
  sendMoney,
  cashIn,
  cashOut,
  getMyTransactions,
  getAllTransactions,
};
