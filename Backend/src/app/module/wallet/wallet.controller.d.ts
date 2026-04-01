import type { Request, Response } from "express";
export declare const WalletControllers: {
    getMyWallet: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getWalletByUserId: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getSystemWallet: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    toggleBlockWallet: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=wallet.controller.d.ts.map