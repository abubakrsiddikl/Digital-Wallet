import { IResponse } from "@/types";
import { IAgentStats } from "@/types/stats.type";
import { apiRequest } from "../apiClient";

export const getAgentDashboardStats = async (): Promise<
  IResponse<IAgentStats>
> => {
  const res = await apiRequest<IAgentStats>(`/stats/agent-stats`);
  return res;
};
