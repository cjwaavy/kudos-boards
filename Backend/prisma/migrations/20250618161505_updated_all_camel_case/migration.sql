/*
  Warnings:

  - You are about to drop the column `cover_img` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `gif_url` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `gif_url` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `message_body` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `coverImg` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gifUrl` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "cover_img",
ADD COLUMN     "coverImg" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "gif_url",
ADD COLUMN     "gifUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "gif_url",
DROP COLUMN "message_body",
ADD COLUMN     "gifUrl" TEXT,
ADD COLUMN     "messageBody" TEXT;
