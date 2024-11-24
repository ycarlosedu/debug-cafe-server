/*
  Warnings:

  - A unique constraint covering the columns `[cardNumber,userId]` on the table `CreditCard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CreditCard_cardNumber_userId_key" ON "CreditCard"("cardNumber", "userId");
