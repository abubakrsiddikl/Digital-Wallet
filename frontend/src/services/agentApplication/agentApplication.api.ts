/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  agentApplyZodSchema,
  balanceRequestZodSchema,
} from "@/zodSchema/agentApplication.schema";
import { apiRequest } from "../apiClient";
import { IResponse } from "@/types";
import { IAgentApplication, IAgentBalanceRequest } from "@/types/agentApplication.type";

// ─── Apply as agent ───────────────────────────────────────────
export const applyAsAgent = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const data = {
    nidNumber: formData.get("nidNumber") as string,
    businessName: (formData.get("businessName") as string) || undefined,
    address: (formData.get("address") as string) || undefined,
    note: (formData.get("note") as string) || undefined,
  };

  const validatedFiled = agentApplyZodSchema.safeParse(data);

  if (!validatedFiled.success) {
    return {
      success: false,
      errors: validatedFiled.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }

  // Remove empty optional fields
  const cleanData = Object.fromEntries(
    Object.entries(validatedFiled.data).filter(
      ([_, v]) => v !== "" && v !== undefined,
    ),
  );

  const res = await apiRequest("/agent/apply", {
    method: "POST",
    body: JSON.stringify(cleanData),
  });

  return res;
};

// ─── Request balance
export const requestBalance = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const data = {
    amount: parseFloat(formData.get("amount") as string),
    note: (formData.get("note") as string) || undefined,
  };

  const validatedFiled = balanceRequestZodSchema.safeParse(data);

  if (!validatedFiled.success) {
    return {
      success: false,
      errors: validatedFiled.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }

  const cleanData = Object.fromEntries(
    Object.entries(validatedFiled.data).filter(
      ([_, v]) => v !== "" && v !== undefined,
    ),
  );

  const res = await apiRequest("/agent/balance-request", {
    method: "POST",
    body: JSON.stringify(cleanData),
  });

  return res;
};

// ─── Get my application status ────────────────────────────────

export const getMyApplicationStatus = async (): Promise<
  IResponse<IAgentApplication>
> => {
  const res = await apiRequest<IAgentApplication>(`/agent/apply/status`);
  // console.log(res.data);
  return res;
};


// ─── GET all agent applications (admin) 
export const getAdminApplications = async (
  queryString?: string,
): Promise<IResponse<IAgentApplication[]>> => {
  return apiRequest<IAgentApplication[]>(
    `/agent/admin/applications?${queryString ?? ""}`,
  );
};

// ─── PATCH approve/reject application ────────────────────────
export const approveApplication = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const id = formData.get("applicationId") as string;
  const status = formData.get("action") as "APPROVE" | "REJECT";
  const reviewNote = (formData.get("reviewNote") as string) || undefined;

  const res = await apiRequest(`/agent/admin/applications/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({ status, reviewNote }),
  });

  return res;
};

// ─── GET all balance requests ─────────────────────────────────
export const getAdminBalanceRequests = async (
  queryString?: string,
): Promise<IResponse<IAgentBalanceRequest[]>> => {
  return apiRequest<IAgentBalanceRequest[]>(
    `/agent/admin/balance-requests?${queryString ?? ""}`,
  );
};

// ─── PATCH approve/reject balance request ─────────────────────
export const approveBalanceRequest = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const id = formData.get("requestId") as string;
  const status = formData.get("action") as "APPROVE" | "REJECT";
  const reviewNote = (formData.get("reviewNote") as string) || undefined;

  const res = await apiRequest(`/agent/admin/balance-requests/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({ status, reviewNote }),
  });

  return res;
};