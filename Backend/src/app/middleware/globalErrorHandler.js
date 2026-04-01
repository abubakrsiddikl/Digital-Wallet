import AppError from "../errorHelper/AppError";
import { envVars } from "../config/env";
export const globalErrorHandler = async (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
//# sourceMappingURL=globalErrorHandler.js.map