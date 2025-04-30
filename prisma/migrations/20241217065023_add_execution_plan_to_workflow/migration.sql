-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "creditCost" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "executionPlan" TEXT;
