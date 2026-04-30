import { IWallet } from "./wallet.type";

export type TRole = "ADMIN" | "USER" | "AGENT";

export interface IUser {
  id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  role: TRole;
  status: "ACTIVE" | "BLOCKED";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  wallet?: IWallet;
}

// login response type
export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}
