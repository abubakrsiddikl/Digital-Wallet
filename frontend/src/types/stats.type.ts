import { ITransaction } from "./transaction.type";
import { IWallet } from "./wallet.type";

export interface IAgentStats {
  totalCashIn: number;
  totalCashOut: number;
  todayCommission: number;
  totalCommission: number;
  transactionCount: number;
  recentTransactions: ITransaction[];
}

export interface IAdminStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  totalSystemCommission: number;
  pendingAgentRequests: number;
  recentTransactions: ITransaction[];
}


export interface ISystemStats {
  totalSystemBalance: number;
  totalUserBalance: number;
  totalAgentBalance: number;
  totalCommissionEarned: number;
  wallets: IWallet[];
}
