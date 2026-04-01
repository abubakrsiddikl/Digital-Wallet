import type { Prisma } from "@prisma/client";
export declare const UserServices: {
    createUser: (userData: Prisma.UserCreateInput) => Promise<{
        id: string;
        name: string;
        image: string | null;
        email: string;
        phone: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isApproved: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUsers: () => Promise<({
        wallet: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            balance: Prisma.Decimal;
            isBlocked: boolean;
            type: import("@prisma/client").$Enums.WalletType;
            userId: string | null;
        } | null;
    } & {
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
    })[]>;
    getMyProfile: (id: string) => Promise<{
        wallet: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            balance: Prisma.Decimal;
            isBlocked: boolean;
            type: import("@prisma/client").$Enums.WalletType;
            userId: string | null;
        } | null;
    } & {
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
    }>;
    updateUser: (id: string, userData: Prisma.UserUpdateInput, requestedByRole: string) => Promise<{
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
    }>;
    deleteUser: (id: string) => Promise<{
        id: string;
        name: string;
        image: string | null;
        email: string;
        phone: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.UserStatus;
        isApproved: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map