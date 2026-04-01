export declare const WalletServices: {
    getMyWallet: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        balance: import("@prisma/client/runtime/client").Decimal;
        isBlocked: boolean;
        type: import("@prisma/client").$Enums.WalletType;
        userId: string | null;
    }>;
    getWalletByUserId: (userId: string) => Promise<{
        user: {
            id: string;
            name: string;
            image: string | null;
            email: string;
            phone: string;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.UserStatus;
            isApproved: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        balance: import("@prisma/client/runtime/client").Decimal;
        isBlocked: boolean;
        type: import("@prisma/client").$Enums.WalletType;
        userId: string | null;
    }>;
    getSystemWallet: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        balance: import("@prisma/client/runtime/client").Decimal;
        isBlocked: boolean;
        type: import("@prisma/client").$Enums.WalletType;
        userId: string | null;
    }>;
    toggleBlockWallet: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        balance: import("@prisma/client/runtime/client").Decimal;
        isBlocked: boolean;
        type: import("@prisma/client").$Enums.WalletType;
        userId: string | null;
    }>;
};
//# sourceMappingURL=wallet.service.d.ts.map