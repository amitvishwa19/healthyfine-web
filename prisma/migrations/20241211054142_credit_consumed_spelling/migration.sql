/*
  Warnings:

  - You are about to drop the column `creditCOnsumed` on the `WorkflowExecution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkflowExecution" DROP COLUMN "creditCOnsumed",
ADD COLUMN     "creditConsumed" INTEGER NOT NULL DEFAULT 0;
