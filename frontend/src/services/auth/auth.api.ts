/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginZodSchema, registerZodSchema } from "@/zodSchema/auth.schema";
import { apiRequest } from "../apiClient";

import jwt, { JwtPayload } from "jsonwebtoken";
import { deleteCookie, setCookie } from "./tokenHandlers";

import { redirect } from "next/navigation";
import { ILoginResponse, IUser, TRole } from "@/types/auth.type";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/utils/auth-utils";

// register api
export const registerUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  };
  // console.log(data)

  const validatedFiled = registerZodSchema.safeParse(data);

  if (!validatedFiled.success) {
    return {
      success: false,
      errors: validatedFiled.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }

  const res = await apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(validatedFiled.data),
  });
  // if (res.success) {
  //   await loginUser(_currentState, formData);
  // }
  return res;
};

// login api
export const loginUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const redirectTo = formData.get("redirect");

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const validatedFiled = loginZodSchema.safeParse(data);
  if (!validatedFiled.success) {
    return {
      success: false,
      errors: validatedFiled.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      })),
    };
  }

  const res = await apiRequest<ILoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(validatedFiled.data),
  });

  if (!res.success) {
    return { success: false, message: res.message };
  }
  // set token in httpOnly cookie
  await setCookie("accessToken", res.data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  const verifiedToken: JwtPayload | string = jwt.verify(
    res.data.accessToken,
    process.env.JWT_ACCESS_SECRET as string,
  );
  if (typeof verifiedToken === "string") {
    throw new Error("Invalid Token");
  }
  // redirect(`/otp-verify?email=${validatedFiled.data.email}`);
    const userRole: TRole = verifiedToken.role;

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
};

// logout

export const logoutUser = async () => {
  await deleteCookie("accessToken");
  redirect("/login?loggedOut=true");
};

// get user profile
export const getUserProfile = async (): Promise<IUser> => {
  const res = await apiRequest<IUser>("/users/me", {
    cache: "force-cache",
    next: { tags: ["user-info"] },
    method: "GET",
  });
  return res.data;
};

// otp verify
export const verifyOtp = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const data = {
    email: formData.get("email"),
    otp: formData.get("otp"),
  };

  const res = await apiRequest("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.success) {
    return { success: false, message: res.message };
  }
};

// OTP verified successfully, you can set any additional cookies or perform actions here
