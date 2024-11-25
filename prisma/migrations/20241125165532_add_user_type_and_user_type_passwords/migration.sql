-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('CLIENT', 'STAFF', 'MANAGER', 'DELIVERY');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" "USER_TYPE" NOT NULL DEFAULT 'CLIENT';

-- CreateTable
CREATE TABLE "UserTypePasswords" (
    "userType" "USER_TYPE" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTypePasswords_pkey" PRIMARY KEY ("userType")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTypePasswords_userType_key" ON "UserTypePasswords"("userType");
