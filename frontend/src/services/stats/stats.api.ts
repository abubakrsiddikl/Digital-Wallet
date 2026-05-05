import { IResponse } from "@/types";
import { IAdminStats, IAgentStats, ISystemStats } from "@/types/stats.type";
import { apiRequest } from "../apiClient";

export const getAgentDashboardStats = async (): Promise<
  IResponse<IAgentStats>
> => {
  const res = await apiRequest<IAgentStats>(`/stats/agent-stats`);
  return res;
};


export const getAdminDashboardStats = async (): Promise<
  IResponse<IAdminStats>
> => {
  const res = await apiRequest<IAdminStats>(`/stats/admin`);
  return res;
};

export const getSystemDashboardStats = async (): Promise<
  IResponse<ISystemStats>
> => {
  const res = await apiRequest<ISystemStats>(`/stats/system`);
  return res;
};