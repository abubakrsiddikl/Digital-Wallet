import { TRole } from "@/types/auth.type";

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

// Auth routes (public)
export const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

// Common protected 
export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-account", "/transactions"],
  pattern: [/^\/wallet/, /^\/profile/],
};

// USER (normal customer)
export const userProtectedRoutes: RouteConfig = {
  exact: ["/send-money", "/cash-out"],
  pattern: [/^\/user/],
};

// AGENT (cash in / cash out manage )
export const agentProtectedRoutes: RouteConfig = {
  exact: ["/cash-in", "/agent-requests"],
  pattern: [/^\/agent/],
};

// ADMIN
export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  pattern: [/^\/admin/],
};

// check route is authRoute
export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};

// check route isMatched
export const isMatched = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern) => pattern.test(pathname));
};

// check route ownership
export const getRouteOwner = (
  pathname: string
): "ADMIN" | "AGENT" | "USER" | "COMMON" | null => {
  if (isMatched(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isMatched(pathname, agentProtectedRoutes)) {
    return "AGENT";
  }
  if (isMatched(pathname, userProtectedRoutes)) {
    return "USER";
  }
  if (isMatched(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

// default dashboard redirect
export const getDefaultDashboardRoute = (role: string) => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  if (role === "AGENT") {
    return "/agent/dashboard";
  }
  if (role === "USER") {
    return "/user/dashboard";
  }
};

// role validation
export const isValidRedirectForRole = (
  redirectPath: string,
  role: TRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};