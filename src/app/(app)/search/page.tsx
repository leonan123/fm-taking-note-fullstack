import { db } from '@/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { NotesList } from '../(notes)/_components/notes-list'

type SearchParams = Promise<{ q: string }>

export const metadata: Metadata = {
  title: 'Search',
}

export default async function SearchPage(props: {
  searchParams: SearchParams
}) {
  const { q } = await props.searchParams
  const { userId } = await auth()

  if (!q) {
    redirect('/')
  }

  const notes = await db.note.findMany({
    where: {
      userId: userId!,
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
        { content: { contains: q, mode: 'insensitive' } },
        {
          NoteTag: {
            some: {
              tag: {
                name: { contains: q, mode: 'insensitive' },
              },
            },
          },
        },
      ],
    },
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
