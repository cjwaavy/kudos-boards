/*
  Warnings:

  - Made the column `messageBody` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "messageBody" SET NOT NULL;
