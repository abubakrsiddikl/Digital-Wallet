-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('USER', 'AGENT', 'SYSTEM');

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "type" "WalletType" NOT NULL DEFAULT 'USER';
