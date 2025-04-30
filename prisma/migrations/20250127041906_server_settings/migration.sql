-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "serverId" TEXT;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
