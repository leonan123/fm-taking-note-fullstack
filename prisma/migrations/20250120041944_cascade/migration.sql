-- DropForeignKey
ALTER TABLE "note_tag" DROP CONSTRAINT "note_tag_note_id_fkey";

-- AddForeignKey
ALTER TABLE "note_tag" ADD CONSTRAINT "note_tag_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
