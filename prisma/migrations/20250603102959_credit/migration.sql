/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Credit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Credit_userId_key" ON "Credit"("userId");
