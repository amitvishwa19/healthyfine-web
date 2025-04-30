-- CreateTable
CREATE TABLE "SYmptom" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SYmptom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SYmptom_userId_idx" ON "SYmptom"("userId");

-- AddForeignKey
ALTER TABLE "SYmptom" ADD CONSTRAINT "SYmptom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
