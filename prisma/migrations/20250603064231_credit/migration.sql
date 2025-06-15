/*
  Warnings:

  - You are about to drop the column `description` on the `Credit` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Credit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Credit" DROP COLUMN "description",
DROP COLUMN "type";
