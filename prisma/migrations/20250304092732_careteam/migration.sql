-- DropIndex
DROP INDEX "Careteam_userId_idx";

-- CreateIndex
CREATE INDEX "Careteam_careId_idx" ON "Careteam"("careId");
