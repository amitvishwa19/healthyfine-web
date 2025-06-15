/*
  Warnings:

  - You are about to drop the column `paymentSignature` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Transaction_transactionId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentSignature",
DROP COLUMN "type",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "status" DROP NOT NULL;
