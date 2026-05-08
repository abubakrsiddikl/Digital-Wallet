/**
 * All Socket.io events — single source of truth
 * Import this in both backend (emit) and frontend (listen)
 */
export const SOCKET_EVENTS = {
  // ─── Transaction events ──────────────────────────────────
  TRANSACTION_SUCCESS: "transaction:success",
  BALANCE_UPDATED: "balance:updated",

  // ─── Agent Application events ────────────────────────────
  APPLICATION_STATUS_CHANGED: "application:status_changed",

  // ─── Balance Request events ───────────────────────────────
  BALANCE_REQUEST_STATUS: "balance_request:status",

  // ─── Admin events ─────────────────────────────────────────
  NEW_AGENT_APPLICATION: "admin:new_agent_application",
  NEW_BALANCE_REQUEST: "admin:new_balance_request",
  NEW_TRANSACTION: "admin:new_transaction",
} as const;

// ─── Payload types ────────────────────────────────────────────

export interface ITransactionSuccessPayload {
  transactionId: string;
  amount: number;
  fee: number;
  type: "SEND_MONEY" | "CASH_IN" | "CASH_OUT";
  direction: "sent" | "received";
  counterpartyName: string;
  counterpartyPhone: string;
  newBalance: number;
  createdAt: string;
}

export interface IBalanceUpdatedPayload {
  newBalance: number;
}

export interface IApplicationStatusPayload {
  applicationId: string;
  status: "APPROVED" | "REJECTED";
  message?: string;
}

export interface IBalanceRequestStatusPayload {
  requestId: string;
  status: "APPROVED" | "REJECTED";
  amount?: number;
}

// Admin balance request payload
export interface IAdminNewBalanceRequestPayload {
  requestId: string;
  agentName: string;
  agentPhone: string;
  amount: number;
  createdAt: string;
}

// Admin payloads
export interface IAdminNewApplicationPayload {
  applicationId: string;
  applicantName: string;
  applicantPhone: string;
  createdAt: string;
}

export interface IAdminNewTransactionPayload {
  transactionId: string;
  amount: number;
  type: string;
  senderName: string;
  receiverName: string;
  createdAt: string;
}
