// "use client";

// import React, { createContext, useContext, useState } from "react";
// import {
//   ITransactionSuccessPayload,
//   IApplicationStatusPayload,
//   IBalanceRequestStatusPayload,
//   IAdminNewApplicationPayload,
// } from "@/socket/socketEvents";

// // টাইপ ডিফাইন করা
// export type NotificationType =
//   | "transaction"
//   | "application"
//   | "balance_request"
//   | "admin";

// export interface INotification {
//   id: string;
//   type: NotificationType;
//   title: string;
//   message: string;
//   amount?: number;
//   direction?: "sent" | "received";
//   isRead: boolean;
//   createdAt: string;
// }

// interface NotificationContextType {
//   notifications: INotification[];
//   unreadCount: number;
//   addTransactionNotification: (payload: ITransactionSuccessPayload) => void;
//   addNewApplicationNotification: (payload: IAdminNewApplicationPayload) => void;
//   addApplicationStatusNotification: (
//     payload: IApplicationStatusPayload,
//   ) => void;
//   addBalanceRequestStatusNotification: (
//     payload: IBalanceRequestStatusPayload,
//   ) => void;
//   addAdminNotification: (title: string, message: string) => void;
//   markAllRead: () => void;
//   clearAll: () => void;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(
//   undefined,
// );

// export const NotificationProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [notifications, setNotifications] = useState<INotification[]>([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const addNotification = (newNotif: INotification) => {
//     setNotifications((prev) => [newNotif, ...prev].slice(0, 50));
//     setUnreadCount((prev) => prev + 1);
//   };

//   const addTransactionNotification = (payload: ITransactionSuccessPayload) => {
//     const isSent = payload.direction === "sent";
//     addNotification({
//       id: crypto.randomUUID(),
//       type: "transaction",
//       title: isSent ? "Money Sent" : "Money Received",
//       message: isSent
//         ? `Sent ৳${payload.amount.toFixed(2)} to ${payload.counterpartyName}`
//         : `Received ৳${payload.amount.toFixed(2)} from ${payload.counterpartyName}`,
//       amount: payload.amount,
//       direction: payload.direction,
//       isRead: false,
//       createdAt: payload.createdAt,
//     });
//   };

//   const addNewApplicationNotification = (
//     payload: IAdminNewApplicationPayload,
//   ) => {
//     addNotification({
//       id: crypto.randomUUID(),
//       type: "admin",
//       title: "New Agent Application",
//       message: `${payload.applicantName} has applied to be an agent.`,
//       isRead: false,
//       createdAt: new Date().toISOString(),
//     });
//   };

//   const addApplicationStatusNotification = (
//     payload: IApplicationStatusPayload,
//   ) => {
//     const isApproved = payload.status === "APPROVED";
//     addNotification({
//       id: crypto.randomUUID(),
//       type: "application",
//       title: isApproved ? "Application Approved!" : "Application Rejected",
//       message: isApproved
//         ? "Congratulations! You are now an Agent."
//         : "Your application was rejected.",
//       isRead: false,
//       createdAt: new Date().toISOString(),
//     });
//   };

//   const addBalanceRequestStatusNotification = (
//     payload: IBalanceRequestStatusPayload,
//   ) => {
//     const isApproved = payload.status === "APPROVED";
//     addNotification({
//       id: crypto.randomUUID(),
//       type: "balance_request",
//       title: isApproved ? "Balance Added!" : "Balance Request Rejected",
//       message: isApproved
//         ? `৳${payload.amount?.toFixed(2)} added to wallet.`
//         : "Rejected.",
//       isRead: false,
//       createdAt: new Date().toISOString(),
//     });
//   };

//   const addAdminNotification = (title: string, message: string) => {
//     addNotification({
//       id: crypto.randomUUID(),
//       type: "admin",
//       title,
//       message,
//       isRead: false,
//       createdAt: new Date().toISOString(),
//     });
//   };

//   const markAllRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     setUnreadCount(0);
//   };

//   const clearAll = () => {
//     setNotifications([]);
//     setUnreadCount(0);
//   };
//   console.log("notificati context", notifications);

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         unreadCount,
//         addTransactionNotification,
//         addNewApplicationNotification,
//         addApplicationStatusNotification,
//         addBalanceRequestStatusNotification,
//         addAdminNotification,
//         markAllRead,
//         clearAll,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// // Custom Hook ব্যবহারের সুবিধার জন্য
// export const useNotifications = () => {
//   const context = useContext(NotificationContext);
//   if (!context)
//     throw new Error(
//       "useNotifications must be used within NotificationProvider",
//     );
//   return context;
// };





"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ITransactionSuccessPayload,
  IApplicationStatusPayload,
  IBalanceRequestStatusPayload,
  IAdminNewApplicationPayload,
  IAdminNewBalanceRequestPayload,
  IAdminNewTransactionPayload,
} from "@/socket/socketEvents";

export type NotificationType =
  | "transaction"
  | "application"
  | "balance_request"
  | "admin";

export interface INotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  amount?: number;
  direction?: "sent" | "received";
  isRead: boolean;
  createdAt: string;
  // Navigation target — click করলে কোথায় যাবে
  href?: string;
}

interface NotificationContextType {
  notifications: INotification[];
  unreadCount: number;
  balance: number | null;
  setBalance: (bal: number) => void;
  addTransactionNotification: (payload: ITransactionSuccessPayload) => void;
  addNewApplicationNotification: (payload: IAdminNewApplicationPayload) => void;
  addApplicationStatusNotification: (payload: IApplicationStatusPayload) => void;
  addBalanceRequestStatusNotification: (payload: IBalanceRequestStatusPayload) => void;
  addNewBalanceRequestNotification: (payload: IAdminNewBalanceRequestPayload) => void;
  addAdminNotification: (title: string, message: string, href?: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [balance, setBalance] = useState<number | null>(null);

  const push = useCallback((n: INotification) => {
    setNotifications((prev) => [n, ...prev].slice(0, 50));
    setUnreadCount((prev) => prev + 1);
  }, []);

  // ─── Transaction (User/Agent) ──────────────────────────────
  const addTransactionNotification = useCallback(
    (payload: ITransactionSuccessPayload) => {
      const isSent = payload.direction === "sent";
      push({
        id: crypto.randomUUID(),
        type: "transaction",
        title: isSent ? "Money Sent" : "Money Received",
        message: isSent
          ? `Sent ৳${payload.amount.toFixed(2)} to ${payload.counterpartyName}`
          : `Received ৳${payload.amount.toFixed(2)} from ${payload.counterpartyName}`,
        amount: payload.amount,
        direction: payload.direction,
        isRead: false,
        createdAt: payload.createdAt,
        // href: "/dashboard/transactions", //  click transaction page
      });

      //  Real-time balance update
      setBalance(payload.newBalance);
    },
    [push],
  );

  // ─── Admin: New agent application submitted ────────────────
  const addNewApplicationNotification = useCallback(
    (payload: IAdminNewApplicationPayload) => {
      push({
        id: crypto.randomUUID(),
        type: "admin",
        title: "New Agent Application",
        message: `${payload.applicantName} (${payload.applicantPhone}) applied`,
        isRead: false,
        createdAt: payload.createdAt,
        href: "/admin/applications", // ✅ admin  application page
      });
    },
    [push],
  );

  // ─── User: Application approved/rejected ──────────────────
  const addApplicationStatusNotification = useCallback(
    (payload: IApplicationStatusPayload) => {
      const isApproved = payload.status === "APPROVED";
      push({
        id: crypto.randomUUID(),
        type: "application",
        title: isApproved ? "Application Approved! 🎉" : "Application Rejected",
        message: isApproved
          ? "Congratulations! You are now an Agent."
          : payload.message ?? "Your application was rejected.",
        isRead: false,
        createdAt: new Date().toISOString(),
        href: "/dashboard/application-status",
      });
    },
    [push],
  );

  // ─── Agent: Balance request approved/rejected ──────────────
  const addBalanceRequestStatusNotification = useCallback(
    (payload: IBalanceRequestStatusPayload) => {
      const isApproved = payload.status === "APPROVED";
      push({
        id: crypto.randomUUID(),
        type: "balance_request",
        title: isApproved ? "Balance Added! 💰" : "Balance Request Rejected",
        message: isApproved
          ? `৳${payload.amount?.toFixed(2)} has been added to your wallet.`
          : "Your balance request was rejected.",
        amount: payload.amount,
        isRead: false,
        createdAt: new Date().toISOString(),
        href: "/agent/wallet",
      });

      // ✅ Balance realtime update for agent
      if (isApproved && payload.amount !== undefined) {
        setBalance((prev) => (prev !== null ? prev + payload.amount! : null));
      }
    },
    [push],
  );

  // ─── Admin: New balance request from agent ─────────────────
  const addNewBalanceRequestNotification = useCallback(
    (payload: IAdminNewBalanceRequestPayload) => {
      push({
        id: crypto.randomUUID(),
        type: "admin",
        title: "New Balance Request",
        message: `${payload.agentName} requested ৳${payload.amount.toFixed(2)}`,
        amount: payload.amount,
        isRead: false,
        createdAt: payload.createdAt,
        href: "/admin/balance-requests",
      });
    },
    [push],
  );

  // ─── Generic admin notification ────────────────────────────
  const addAdminNotification = useCallback(
    (title: string, message: string, href?: string) => {
      push({
        id: crypto.randomUUID(),
        type: "admin",
        title,
        message,
        isRead: false,
        createdAt: new Date().toISOString(),
        href,
      });
    },
    [push],
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        balance,
        setBalance,
        addTransactionNotification,
        addNewApplicationNotification,
        addApplicationStatusNotification,
        addBalanceRequestStatusNotification,
        addNewBalanceRequestNotification,
        addAdminNotification,
        markAllRead,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};