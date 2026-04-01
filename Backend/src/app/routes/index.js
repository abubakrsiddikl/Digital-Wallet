import { Router } from "express";
import { UserRoutes } from "../module/user/user.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { TransactionRoutes } from "../module/transaction/transaction.route";
import { WalletRoutes } from "../module/wallet/wallet.route";
export const router = Router();
const modulesRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/transaction",
        route: TransactionRoutes,
    },
    {
        path: "/wallet",
        route: WalletRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
//# sourceMappingURL=index.js.map