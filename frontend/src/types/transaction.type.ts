import { IUser } from "./auth.type";

export type TransactionType =
  | "SEND_MONEY"
  | "CASH_OUT"
  | "CASH_IN"
  | "RECHARGE"
  | "ADD_MONEY";
type TransactionDirection = "sent" | "received";

export interface ITransaction {
  id: string;
  transactionId: string;
  agentCommission: string;
  systemCommission: string;
  amount: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  fee: string;
  type: TransactionType;
  direction: TransactionDirection;
  from: Partial<IUser>;
  to: Partial<IUser>;
  createdAt: string;
}
