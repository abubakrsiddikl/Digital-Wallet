// "use client";

// import { useEffect } from "react";
// import { useSocket, SOCKET_EVENTS } from "@/hooks/useSocket";
// import { useNotifications } from "@/context/NotificationContext"; // Context hook

// export const SocketProvider = ({
//   token,
//   children,
// }: {
//   token: string | null;
//   children: React.ReactNode;
// }) => {
//   const { on } = useSocket(token);
//   const {
//     addTransactionNotification,
//     addNewApplicationNotification,
//     addApplicationStatusNotification,
//     addBalanceRequestStatusNotification,
//     addAdminNotification,
//   } = useNotifications();

//   useEffect(() => {
//     if (!token) return;

//     const offTrx = on(
//       SOCKET_EVENTS.TRANSACTION_SUCCESS,
//       addTransactionNotification,
//     );
//     const offAppNew = on(
//       SOCKET_EVENTS.NEW_AGENT_APPLICATION,
//       addNewApplicationNotification,
//     );
//     const offApp = on(
//       SOCKET_EVENTS.APPLICATION_STATUS_CHANGED,
//       addApplicationStatusNotification,
//     );
//     const offBalReq = on(
//       SOCKET_EVENTS.BALANCE_REQUEST_STATUS,
//       addBalanceRequestStatusNotification,
//     );

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const offAdminTrx = on(SOCKET_EVENTS.NEW_TRANSACTION, (p: any) =>
//       addAdminNotification(
//         "New Transaction",
//         `${p.senderName} sent ৳${p.amount}`,
//       ),
//     );

//     return () => {
//       offTrx();
//       offApp();
//       offAppNew();
//       offBalReq();
//       offAdminTrx();
//     };
//   }, [
//     token,
//     on,
//     addTransactionNotification,
//     addNewApplicationNotification,
//     addApplicationStatusNotification,
//     addBalanceRequestStatusNotification,
//     addAdminNotification,
//   ]);

//   return <>{children}</>;
// };


"use client";

import { useEffect } from "react";
import { useSocket, SOCKET_EVENTS } from "@/hooks/useSocket";
import { useNotifications } from "@/context/NotificationContext";
import {
  ITransactionSuccessPayload,
  IBalanceUpdatedPayload,
  IApplicationStatusPayload,
  IBalanceRequestStatusPayload,
  IAdminNewApplicationPayload,
  IAdminNewBalanceRequestPayload,
  IAdminNewTransactionPayload,
} from "@/socket/socketEvents";

export const SocketProvider = ({
  token,
  children,
}: {
  token: string | null;
  children: React.ReactNode;
}) => {
  const { on } = useSocket(token);
  const {
    addTransactionNotification,
    addNewApplicationNotification,
    addApplicationStatusNotification,
    addBalanceRequestStatusNotification,
    addNewBalanceRequestNotification,
    addAdminNotification,
    setBalance,
  } = useNotifications();

  useEffect(() => {
    if (!token) return;

    // ─── 1. Transaction success (User/Agent) ─────────────────
    const offTrx = on<ITransactionSuccessPayload>(
      SOCKET_EVENTS.TRANSACTION_SUCCESS,
      addTransactionNotification, // balance 
    );

    // ─── 2. Balance updated (direct wallet update) ────────────
    // transaction notification
    const offBalance = on<IBalanceUpdatedPayload>(
      SOCKET_EVENTS.BALANCE_UPDATED,
      ({ newBalance }) => {
        setBalance(newBalance);
      },
    );

    // ─── 3. Application status changed (User → Agent approved) 
    const offAppStatus = on<IApplicationStatusPayload>(
      SOCKET_EVENTS.APPLICATION_STATUS_CHANGED,
      addApplicationStatusNotification,
    );

    // ─── 4. Balance request status (Agent) ────────────────────
    const offBalReqStatus = on<IBalanceRequestStatusPayload>(
      SOCKET_EVENTS.BALANCE_REQUEST_STATUS,
      addBalanceRequestStatusNotification,
    );

    // ─── 5. Admin: New agent application submitted ────────────
    const offNewApp = on<IAdminNewApplicationPayload>(
      SOCKET_EVENTS.NEW_AGENT_APPLICATION,
      addNewApplicationNotification,
    );

    // ─── 6. Admin: New balance request from agent ─────────────
    const offNewBalReq = on<IAdminNewBalanceRequestPayload>(
      SOCKET_EVENTS.NEW_BALANCE_REQUEST,
      addNewBalanceRequestNotification,
    );

    // ─── 7. Admin: New transaction happened ───────────────────
    const offAdminTrx = on<IAdminNewTransactionPayload>(
      SOCKET_EVENTS.NEW_TRANSACTION,
      (p) =>
        addAdminNotification(
          "New Transaction",
          `${p.senderName} → ${p.receiverName} | ৳${p.amount}`,
          "/admin/transactions",
        ),
    );

    return () => {
      offTrx();
      offBalance();
      offAppStatus();
      offBalReqStatus();
      offNewApp();
      offNewBalReq();
      offAdminTrx();
    };
  }, [
    token,
    on,
    addTransactionNotification,
    addNewApplicationNotification,
    addApplicationStatusNotification,
    addBalanceRequestStatusNotification,
    addNewBalanceRequestNotification,
    addAdminNotification,
    setBalance,
  ]);

  return <>{children}</>;
};