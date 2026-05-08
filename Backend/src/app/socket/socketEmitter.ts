import { emitToUser, emitToAdmins } from "./socketServer";
import {
  SOCKET_EVENTS,
  ITransactionSuccessPayload,
  IApplicationStatusPayload,
  IBalanceRequestStatusPayload,
  IAdminNewApplicationPayload,
  IAdminNewTransactionPayload,
  IAdminNewBalanceRequestPayload,
} from "./socketEvents";
import { prisma } from "../utils/prisma";

/**
 * Called after every successful transaction (sendMoney, cashIn, cashOut)
 * Emits to both sender and receiver
 */
export const emitTransactionSuccess = async (transactionId: string) => {
  try {
    const trx = await prisma.transaction.findUnique({
      where: { id: transactionId },
      include: {
        sender: { select: { id: true, name: true, phone: true } },
        receiver: { select: { id: true, name: true, phone: true } },
      },
    });

    if (!trx) return;

    // Fetch updated balances
    const [senderWallet, receiverWallet] = await Promise.all([
      prisma.wallet.findUnique({ where: { userId: trx.senderId } }),
      prisma.wallet.findUnique({ where: { userId: trx.receiverId } }),
    ]);

    // Emit to SENDER
    const senderPayload: ITransactionSuccessPayload = {
      transactionId: trx.transactionId,
      amount: Number(trx.amount),
      fee: Number(trx.fee),
      type: trx.type as "SEND_MONEY" | "CASH_IN" | "CASH_OUT",
      direction: "sent",
      counterpartyName: trx.receiver?.name ?? "Unknown",
      counterpartyPhone: trx.receiver?.phone ?? "",
      newBalance: Number(senderWallet?.balance ?? 0),
      createdAt: trx.createdAt.toISOString(),
    };
    emitToUser(trx.senderId, SOCKET_EVENTS.TRANSACTION_SUCCESS, senderPayload);
    emitToUser(trx.senderId, SOCKET_EVENTS.BALANCE_UPDATED, {
      newBalance: senderPayload.newBalance,
    });

    // Emit to RECEIVER
    const receiverPayload: ITransactionSuccessPayload = {
      transactionId: trx.transactionId,
      amount: Number(trx.amount),
      fee: 0,
      type: trx.type as "SEND_MONEY" | "CASH_IN" | "CASH_OUT",
      direction: "received",
      counterpartyName: trx.sender?.name ?? "Unknown",
      counterpartyPhone: trx.sender?.phone ?? "",
      newBalance: Number(receiverWallet?.balance ?? 0),
      createdAt: trx.createdAt.toISOString(),
    };
    emitToUser(
      trx.receiverId,
      SOCKET_EVENTS.TRANSACTION_SUCCESS,
      receiverPayload,
    );
    emitToUser(trx.receiverId, SOCKET_EVENTS.BALANCE_UPDATED, {
      newBalance: receiverPayload.newBalance,
    });

    // Emit to ADMIN room
    const adminPayload: IAdminNewTransactionPayload = {
      transactionId: trx.transactionId,
      amount: Number(trx.amount),
      type: trx.type,
      senderName: trx.sender?.name ?? "Unknown",
      receiverName: trx.receiver?.name ?? "Unknown",
      createdAt: trx.createdAt.toISOString(),
    };
    emitToAdmins(SOCKET_EVENTS.NEW_TRANSACTION, adminPayload);
  } catch (err) {
    console.error("[Socket Emitter] emitTransactionSuccess error:", err);
  }
};

/**
 * Called after agent application approve/reject
 */
export const emitApplicationStatusChanged = (
  userId: string,
  payload: IApplicationStatusPayload,
) => {
  emitToUser(userId, SOCKET_EVENTS.APPLICATION_STATUS_CHANGED, payload);
};

// emit to agent send new balance request
export const emitNewBalanceRequest = (
  payload: IAdminNewBalanceRequestPayload,
) => {
  emitToAdmins(SOCKET_EVENTS.NEW_BALANCE_REQUEST, payload);
};

/**
 * Called after balance request approve/reject
 */
export const emitBalanceRequestStatus = (
  agentId: string,
  payload: IBalanceRequestStatusPayload,
) => {
  emitToUser(agentId, SOCKET_EVENTS.BALANCE_REQUEST_STATUS, payload);
};

/**
 * Called when a new agent application is submitted — notifies admins
 */
export const emitNewAgentApplication = (
  payload: IAdminNewApplicationPayload,
) => {
  emitToAdmins(SOCKET_EVENTS.NEW_AGENT_APPLICATION, payload);
};
