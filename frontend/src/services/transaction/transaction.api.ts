/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  cashOutUserToAgentZodSchema,
  sendMoneyUserZodSchema,
} from "@/zodSchema/transaction.schema";
import { apiRequest } from "../apiClient";
import { ITransaction } from "@/types/transaction";
import { IResponse } from "@/types";

// send money to user<-->user
export const sendMoneyUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const data = {
    receiverPhone: formData.get("phone"),
    amount: parseFloat(formData.get("amount") as string),
    pin: formData.get("pin"),
  };
  // console.log(data)

  const validatedFiled = sendMoneyUserZodSchema.safeParse(data);

  if (!validatedFiled.success) {
    return {
      success: false,
      errors: validatedFiled.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }
  // console.log(validatedFiled.data,"vdata")

  const res = await apiRequest("/transaction/send-money", {
    method: "POST",
    body: JSON.stringify(validatedFiled.data),
  });

  return res;
};

// get all transactions of user
export const getMyTransactions = async (
  queryString?: string,
): Promise<IResponse<ITransaction[]>> => {
  const res = await apiRequest<ITransaction[]>(
    `/transaction/my-transactions?${queryString ?? ""}`,
  );
  return res;
};

// cash out to agent : user --> agent

export const cashOutUserToAgent = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const data = {
    agentPhone: formData.get("agentPhone"),
    amount: parseFloat(formData.get("amount") as string),
    pin: formData.get("pin"),
  };
  // console.log(data)

  const validatedFiled = cashOutUserToAgentZodSchema.safeParse(data);

  if (!validatedFiled.success) {
    return {
      success: false,
      errors: validatedFiled.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }
  // console.log(validatedFiled.data,"vdata")

  const res = await apiRequest("/transaction/cash-out", {
    method: "POST",
    body: JSON.stringify(validatedFiled.data),
  });

  return res;
};
