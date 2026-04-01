import type { Request, Response } from "express";
export declare const TransactionControllers: {
    sendMoney: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    cashIn: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    cashOut: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyTransactions: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllTransactions: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=transaction.controller.d.ts.map