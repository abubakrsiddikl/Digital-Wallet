import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { envVars } from "../config/env";

// ─── Types ────────────────────────────────────────────────────
export interface ISocketUser {
  id: string;
  role: string;
  socketId: string;
}

// ─── In-memory connected users map ───────────────────────────
// userId → socketId
const connectedUsers = new Map<string, string>();

let io: SocketIOServer;

// ─── Init Socket Server ───────────────────────────────────────
export const initSocketServer = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: envVars.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  //  Auth Middleware 
  io.use((socket: Socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as ISocketUser;
      // console.log("socket user jwt dec",decoded)
      socket.data.userId = decoded.id;
      socket.data.role = decoded.role;
      next();
    } catch {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  // ─── Connection Handler ──────────────────────────────────
  io.on("connection", (socket: Socket) => {
    const { userId, role } = socket.data;

    // Store user connection
    connectedUsers.set(userId, socket.id);
    console.log(`[Socket] Connected: ${userId} (${role}) → ${socket.id}`);

    // Join personal room
    socket.join(`user:${userId}`);

    // Admin joins admin room
    if (role === "ADMIN") {
      socket.join("room:admin");
    }

    // Agent joins agent room
    if (role === "AGENT") {
      socket.join(`room:agent:${userId}`);
    }

    socket.on("disconnect", () => {
      connectedUsers.delete(userId);
      console.log(`[Socket] Disconnected: ${userId}`);
    });
  });

  console.log("✅ [Socket] Server initialized");
  return io;
};

// ─── Emit Helpers (call from services) 
export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

/**
 * Emit to a specific user by userId
 */
export const emitToUser = (userId: string, event: string, payload: unknown) => {
  getIO().to(`user:${userId}`).emit(event, payload);
};

/**
 * Emit to all admins
 */
export const emitToAdmins = (event: string, payload: unknown) => {
  getIO().to("room:admin").emit(event, payload);
};

/**
 * Emit to all connected clients
 */
export const emitToAll = (event: string, payload: unknown) => {
  getIO().emit(event, payload);
};

export { connectedUsers };