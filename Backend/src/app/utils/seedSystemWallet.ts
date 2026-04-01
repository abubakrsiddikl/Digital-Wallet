import { prisma } from "./prisma";

export const seedSystemWallet = async () => {
  try {
    const existing = await prisma.wallet.findFirst({
      where: { type: "SYSTEM" },
    });

    if (existing) {
      console.log("✅ System wallet already exists");
      return;
    }

    await prisma.wallet.create({
      data: {
        id: "SYSTEM_WALLET",
        type: "SYSTEM",
        balance: 0,
      },
    });

    console.log("🔥 System wallet created successfully");
  } catch (error) {
    console.error("❌ Error creating system wallet:", error);
  }
};
