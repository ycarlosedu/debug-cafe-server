-- CreateTable
CREATE TABLE "OrderFeedback" (
    "orderId" TEXT NOT NULL,
    "feedbackComment" TEXT NOT NULL,
    "feedbackStars" INTEGER NOT NULL,
    "deliveryFeedbackComment" TEXT NOT NULL,
    "deliveryFeedbackStars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderFeedback_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "OrderFeedback" ADD CONSTRAINT "OrderFeedback_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
