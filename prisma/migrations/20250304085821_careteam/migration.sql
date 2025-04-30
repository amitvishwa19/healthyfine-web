/*
  Warnings:

  - You are about to drop the column `user` on the `CareTeam` table. All the data in the column will be lost.
  - Added the required column `userId` to the `CareTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CareTeam" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL;
