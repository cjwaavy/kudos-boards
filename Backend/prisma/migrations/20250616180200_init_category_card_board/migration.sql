-- CreateEnum
CREATE TYPE "Category" AS ENUM ('NONE', 'CELEBRATION', 'THANK_YOU', 'INSPIRATION');

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'NONE',
    "cover_img" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gif_url" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
