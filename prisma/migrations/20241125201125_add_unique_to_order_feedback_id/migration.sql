/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `OrderFeedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderFeedback_orderId_key" ON "OrderFeedback"("orderId");
