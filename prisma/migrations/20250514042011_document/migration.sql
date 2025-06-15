/*
  Warnings:

  - You are about to drop the column `docType` on the `Document` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "docType",
ADD COLUMN     "documentType" TEXT;
