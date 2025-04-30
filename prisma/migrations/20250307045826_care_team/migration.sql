/*
  Warnings:

  - You are about to drop the column `date` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `slot` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Care` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Care` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Care" DROP COLUMN "date",
DROP COLUMN "note",
DROP COLUMN "slot",
DROP COLUMN "status",
DROP COLUMN "time",
DROP COLUMN "type";
