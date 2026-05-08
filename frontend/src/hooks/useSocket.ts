"use client";

import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/socket/socketEvents";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_SOCKET_URL!;

let socket: Socket | null = null;

export const useSocket = (token: string | null) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    // Singleton — don't reconnect if already connected
    if (socket?.connected) {
      socketRef.current = socket;
      return;
    }

    socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket","polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Socket] Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket] Connection error:", err.message);
    });

    return () => {
      // Don't disconnect on component unmount — keep alive globally
      // Only disconnect on logout (call disconnectSocket())
    };
  }, [token]);

  // const on = useCallback(<T>(event: string, handler: (data: T) => void) => {
  //   socketRef.current?.on(event, handler);
  //   return () => {
  //     socketRef.current?.off(event, handler);
  //   };
  // }, []);
  const on = useCallback(<T>(event: string, handler: (data: T) => void) => {
 
  if (!socket) return () => {};
  socket.on(event, handler);
  return () => {
    socket?.off(event, handler);
  };
}, []); 

  // eslint-disable-next-line react-hooks/refs
  return { socket: socketRef.current, on };
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};

export { SOCKET_EVENTS };