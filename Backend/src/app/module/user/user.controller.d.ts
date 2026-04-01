import type { Request, Response } from "express";
export declare const UserControllers: {
    createUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllUsers: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getMyProfile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    deleteUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map