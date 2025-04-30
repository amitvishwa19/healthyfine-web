/*
  Warnings:

  - The primary key for the `UserBalance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserBalance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserBalance" DROP CONSTRAINT "UserBalance_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserBalance_pkey" PRIMARY KEY ("userId");
