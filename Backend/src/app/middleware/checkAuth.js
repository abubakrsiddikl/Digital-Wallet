import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import httpStatus from "http-status-codes";
import { prisma } from "../utils/prisma";
import AppError from "../errorHelper/AppError";
export const checkAuth = (...authRoles) => async (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken || req.headers.authorization;
        if (accessToken?.startsWith("Bearer ")) {
            accessToken = accessToken?.split(" ")[1];
        }
        if (!accessToken) {
            throw new AppError(403, "No Token Received");
        }
        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET);
        const isUserExist = await prisma.user.findUnique({
            where: {
                id: verifiedToken.id,
                status: "ACTIVE",
            },
        });
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        console.log("jwt error", error);
        next(error);
    }
};
//# sourceMappingURL=checkAuth.js.map