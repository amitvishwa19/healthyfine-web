/*
  Warnings:

  - You are about to drop the column `creditConsumed` on the `WorkflowExecution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkflowExecution" DROP COLUMN "creditConsumed",
ADD COLUMN     "creditCOnsumed" INTEGER NOT NULL DEFAULT 0;
