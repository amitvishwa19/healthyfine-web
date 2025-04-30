-- CreateTable
CREATE TABLE "CareTeam" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "careId" TEXT NOT NULL,

    CONSTRAINT "CareTeam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CareTeam" ADD CONSTRAINT "CareTeam_careId_fkey" FOREIGN KEY ("careId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
