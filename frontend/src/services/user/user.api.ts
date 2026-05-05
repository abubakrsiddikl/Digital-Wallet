/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/types/auth.type";
import { apiRequest } from "../apiClient";
import { IResponse } from "@/types";

// get all users
export const getAllUsers = async (
  queryString?: string,
): Promise<IResponse<IUser[]>> => {
  const res = await apiRequest<IUser[]>(`/users?${queryString ?? ""}`, {
    method: "GET",
  });
  return res;
};

// update user status (active/block)
export const updateUserStatus = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const userId = formData.get("userId");
  const userStatus = formData.get("action");

  const res = await apiRequest<IUser[]>(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: userStatus }),
  });
  return res;
};

// update user role (admin/user)
export const updateUserRole = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const userId = formData.get("userId");
  const userRole = formData.get("role");

  const res = await apiRequest<IUser[]>(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ role: userRole }),
  });
  return res;
};
