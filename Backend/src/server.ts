import { createServer } from "http";
import { envVars } from "./app/config/env";
import app from "./app";
import { seedSystemWallet } from "./app/utils/seedSystemWallet";
import { initSocketServer } from "./app/socket/socketServer";

let server: ReturnType<typeof createServer>;

const startServer = async () => {
  try {
    await seedSystemWallet();

    // ✅ Create HTTP server from express app
    server = createServer(app);

    // ✅ Attach Socket.io to the same HTTP server
    initSocketServer(server);

    server.listen(envVars.PORT, () => {
      console.log("✅ Server is running on port " + envVars.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

process.on("SIGTERM", () => {
  if (server) server.close(() => process.exit(1));
  else process.exit(1);
});

process.on("SIGINT", () => {
  if (server) server.close(() => process.exit(1));
  else process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  if (server) server.close(() => process.exit(1));
  else process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
  if (server) server.close(() => process.exit(1));
  else process.exit(1);
});