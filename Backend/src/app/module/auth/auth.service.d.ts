export declare const AuthServices: {
    login: (payload: {
        email: string;
        password: string;
    }) => Promise<{
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
};
//# sourceMappingURL=auth.service.d.ts.map