import { IUser } from "./auth.type";

export type AgentApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IAgentApplication {
  id: string;
  user: IUser;
  status: AgentApplicationStatus;
  reviewNote: string | null;
  nidNumber: string;
  businessName: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAgentBalanceRequest {
  id: string;
  agentId: string;
  amount: string;
  note: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewedBy: string | null;
  reviewNote: string | null;
  createdAt: string;
  updatedAt: string;
  agent: IUser;
}
