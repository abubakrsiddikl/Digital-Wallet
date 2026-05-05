/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  agentApplyZodSchema,
  balanceRequestZodSchema,
} from "@/zodSchema/agentApplication.schema";
import { apiRequest } from "../apiClient";
import { IResponse } from "@/types";
import { IAgentRequest } from "@/types/agentApplication.type";

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
  IResponse<IAgentRequest>
> => {
  const res = await apiRequest<IAgentRequest>(`/agent/apply/status`);
  console.log(res.data);
  return res;
};
