import { ITransaction } from "./transaction.type";

export interface IAgentStats {
  totalCashIn: number;
  totalCashOut: number;
  todayCommission: number;
  totalCommission: number;
  transactionCount: number;
  recentTransactions: ITransaction[];
}