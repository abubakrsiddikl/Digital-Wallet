import {} from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { router } from "./app/routes";
const app = express();
(app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
})),
    app.use(cookieParser()),
    app.use(express.json()),
    app.use(express.urlencoded({ extended: true })),
    //   route
    app.use("/api/v1", router),
    app.get("/", (req, res) => {
        res.json({ message: "welcome to the server" });
    }));
app.use(globalErrorHandler);
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map