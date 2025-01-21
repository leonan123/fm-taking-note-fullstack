/*
  Warnings:

  - You are about to drop the column `noteId` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "note_tag" DROP CONSTRAINT "note_tag_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_noteId_fkey";

-- AlterTable
ALTER TABLE "tag" DROP COLUMN "noteId";

-- AddForeignKey
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
