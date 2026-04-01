import type { Response } from "express";
export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}
export declare const setAuthCookie: (res: Response, tokenInfo: AuthTokens) => void;
//# sourceMappingURL=setAuthCookie.d.ts.map