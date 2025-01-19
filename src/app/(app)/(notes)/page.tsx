import { NotesList } from './_components/notes-list'
import { db } from '@/_lib/prisma'
import { auth } from '@clerk/nextjs/server'

export const metadata = {
  title: 'All Notes',
}

export default async function AllNotesPage() {
  const { userId } = await auth()

  const notes = await db.note.findMany({
    where: { userId: userId! },
    include: {
      NoteTag: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const parsedNotes = notes.map(({ NoteTag, ...note }) => ({
    ...note,
    tags: NoteTag.map((noteTag) => noteTag.tag),
  }))

  return (
    <div className="flex flex-1">
      <NotesList notes={parsedNotes} />
    </div>
  )
}
