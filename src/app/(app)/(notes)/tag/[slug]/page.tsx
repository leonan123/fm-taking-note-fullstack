import { db } from '@/_lib/prisma'
import { redirect } from 'next/navigation'
import { NotesList } from '../../_components/notes-list'
import { auth } from '@clerk/nextjs/server'

interface TagPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params

  return {
    title: `Notes Tagged: ${slug}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const { userId } = await auth()

  if (!slug) {
    redirect('/')
  }

  if (!userId) {
    redirect('/sign-in')
  }

  const notes = await db.note.findMany({
    where: {
      userId,

      NoteTag: {
        some: {
          tag: {
            name: slug,
          },
        },
      },
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
