-- CreateTable
CREATE TABLE "WorkflowExecutionLogs" (
    "id" TEXT NOT NULL,
    "logLevel" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "workflowExecutionPhaseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkflowExecutionLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkflowExecutionLogs" ADD CONSTRAINT "WorkflowExecutionLogs_workflowExecutionPhaseId_fkey" FOREIGN KEY ("workflowExecutionPhaseId") REFERENCES "WorkflowExecutionPhase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
