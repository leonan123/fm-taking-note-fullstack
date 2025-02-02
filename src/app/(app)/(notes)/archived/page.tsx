import { db } from '@/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { NotesList } from '../_components/notes-list'

export default async function ArchivedNotesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const archivedNotes = await db.note.findMany({
    where: { userId, isArchived: true },
    include: {
      NoteTag: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  const parsedArchivedNotes = archivedNotes.map(({ NoteTag, ...note }) => ({
    ...note,
    tags: NoteTag.map((noteTag) => noteTag.tag),
  }))

  return (
    <div className="flex flex-1">
      <NotesList notes={parsedArchivedNotes} />
    </div>
  )
}
