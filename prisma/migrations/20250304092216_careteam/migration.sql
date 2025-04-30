/*
  Warnings:

  - You are about to drop the `CareTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CareTeam" DROP CONSTRAINT "CareTeam_careId_fkey";

-- DropTable
DROP TABLE "CareTeam";

-- CreateTable
CREATE TABLE "Careteam" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "careId" TEXT NOT NULL,

    CONSTRAINT "Careteam_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Careteam_userId_idx" ON "Careteam"("userId");

-- AddForeignKey
ALTER TABLE "Careteam" ADD CONSTRAINT "Careteam_careId_fkey" FOREIGN KEY ("careId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
