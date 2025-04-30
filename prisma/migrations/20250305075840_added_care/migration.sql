/*
  Warnings:

  - You are about to drop the `Careteam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Careteam" DROP CONSTRAINT "Careteam_careId_fkey";

-- DropTable
DROP TABLE "Careteam";

-- CreateTable
CREATE TABLE "Care" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "careId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slot" TEXT NOT NULL,
    "time" TEXT,
    "note" TEXT,
    "type" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Care_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Care_patientId_idx" ON "Care"("patientId");

-- CreateIndex
CREATE INDEX "Care_careId_idx" ON "Care"("careId");

-- AddForeignKey
ALTER TABLE "Care" ADD CONSTRAINT "Care_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Care" ADD CONSTRAINT "Care_careId_fkey" FOREIGN KEY ("careId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
