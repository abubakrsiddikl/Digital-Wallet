import { IUser } from "./auth.type";

export interface IWallet {
  id: string;
  user: Partial<IUser>;
  balance: string;
  isBlocked: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}
