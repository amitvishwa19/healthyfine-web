/*
  Warnings:

  - You are about to drop the `ExecutionPhase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExecutionPhase" DROP CONSTRAINT "ExecutionPhase_workflowExceutionId_fkey";

-- DropTable
DROP TABLE "ExecutionPhase";

-- CreateTable
CREATE TABLE "WorkflowExecutionPhase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "inputs" TEXT,
    "outputs" TEXT,
    "creditConsumed" INTEGER,
    "workflowExceutionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowExecutionPhase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkflowExecutionPhase" ADD CONSTRAINT "WorkflowExecutionPhase_workflowExceutionId_fkey" FOREIGN KEY ("workflowExceutionId") REFERENCES "WorkflowExecution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
