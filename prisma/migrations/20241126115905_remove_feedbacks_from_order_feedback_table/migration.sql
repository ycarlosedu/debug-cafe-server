/*
  Warnings:

  - You are about to drop the column `deliveryFeedbackComment` on the `OrderFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryFeedbackStars` on the `OrderFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackComment` on the `OrderFeedback` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackStars` on the `OrderFeedback` table. All the data in the column will be lost.
  - Added the required column `comment` to the `OrderFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryComment` to the `OrderFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryStars` to the `OrderFeedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `OrderFeedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderFeedback" DROP COLUMN "deliveryFeedbackComment",
DROP COLUMN "deliveryFeedbackStars",
DROP COLUMN "feedbackComment",
DROP COLUMN "feedbackStars",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "deliveryComment" TEXT NOT NULL,
ADD COLUMN     "deliveryStars" INTEGER NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL;
