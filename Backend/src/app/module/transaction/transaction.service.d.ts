import { Decimal } from "@prisma/client/runtime/client";
export declare const TransactionServices: {
    sendMoney: ({ senderId, receiverPhone, amount, pin, }: {
        senderId: string;
        receiverPhone: string;
        amount: number;
        pin: string;
    }) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.TransactionType;
        amount: Decimal;
        fee: Decimal;
        agentCommission: Decimal;
        systemCommission: Decimal;
        transactionId: string;
        receiverId: string;
        initiatedBy: string;
        senderId: string;
    }>;
    cashIn: ({ agentId, userPhone, amount, pin, }: {
        agentId: string;
        userPhone: string;
        amount: number;
        pin: string;
    }) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.TransactionType;
        amount: Decimal;
        fee: Decimal;
        agentCommission: Decimal;
        systemCommission: Decimal;
        transactionId: string;
        receiverId: string;
        initiatedBy: string;
        senderId: string;
    }>;
    cashOut: ({ userId, agentPhone, amount, pin, }: {
        userId: string;
        agentPhone: string;
        amount: number;
        pin: string;
    }) => Promise<{
        id: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.TransactionType;
        amount: Decimal;
        fee: Decimal;
        agentCommission: Decimal;
        systemCommission: Decimal;
        transactionId: string;
        receiverId: string;
        initiatedBy: string;
        senderId: string;
    }>;
    getMyTransactions: (userId: string) => Promise<{
        id: string;
        transactionId: string;
        amount: Decimal;
        fee: Decimal;
        type: import("@prisma/client").$Enums.TransactionType;
        direction: string;
        from: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
        to: {
            id: string;
            name: string;
            email: string;
            phone: string;
            role: import("@prisma/client").$Enums.UserRole;
        };
        createdAt: Date;
    }[]>;
    getAllTransactions: () => Promise<({
        receiver: {
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
        };
        sender: {
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
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.TransactionStatus;
        createdAt: Date;
        updatedAt: Date;
        type: import("@prisma/client").$Enums.TransactionType;
        amount: Decimal;
        fee: Decimal;
        agentCommission: Decimal;
        systemCommission: Decimal;
        transactionId: string;
        receiverId: string;
        initiatedBy: string;
        senderId: string;
    })[]>;
};
//# sourceMappingURL=transaction.service.d.ts.map