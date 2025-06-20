/*
  Warnings:

  - Added the required column `upvotes` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "upvotes" INTEGER NOT NULL;
