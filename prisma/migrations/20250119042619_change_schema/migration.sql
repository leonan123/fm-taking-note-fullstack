/*
  Warnings:

  - The primary key for the `note_tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagTagId` on the `note_tag` table. All the data in the column will be lost.
  - You are about to drop the `_NoteToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `note` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag_id` to the `note_tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_NoteToTag" DROP CONSTRAINT "_NoteToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_NoteToTag" DROP CONSTRAINT "_NoteToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "note_tag" DROP CONSTRAINT "note_tag_tagTagId_fkey";

-- AlterTable
ALTER TABLE "note_tag" DROP CONSTRAINT "note_tags_id",
DROP COLUMN "tagTagId",
ADD COLUMN     "tag_id" INTEGER NOT NULL,
ADD CONSTRAINT "note_tags_id" PRIMARY KEY ("note_id", "tag_id");

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "noteId" TEXT;

-- DropTable
DROP TABLE "_NoteToTag";

-- CreateIndex
CREATE UNIQUE INDEX "note_id_key" ON "note"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_id_key" ON "tag"("id");

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
