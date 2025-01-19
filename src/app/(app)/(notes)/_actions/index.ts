'use server'

import { db } from '@/_lib/prisma'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Tag } from '../_hooks/use-tag-input'

interface createNoteAction {
  userId: string
  id?: string
  title: string
  content: string | null
  tags?: Tag[]
  updatedAt?: string | null
}

export async function upsertNoteAction(data: createNoteAction) {
  const note = await db.note.upsert({
    where: { id: data.id ?? '' },
    create: {
      title: data.title,
      content: data.content,
      userId: data.userId,
    },
    update: {
      title: data.title,
      content: data.content,
    },
  })

  await db.noteTag.deleteMany({
    where: {
      noteId: note.id,
    },
  })

  if (data.tags) {
    await db.noteTag.createMany({
      data: data.tags.map((tag) => ({
        noteId: note.id,
        tagId: tag.id,
      })),
    })
  }

  revalidatePath('/')
}

export async function createTagAction(tag: string, userId: string) {
  const newTag = await db.tag.create({
    data: {
      name: tag,
      userId,
    },
  })

  revalidateTag('tags')

  return { newTag }
}
