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
    where: { id: data.id ?? '', userId: data.userId },
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

export async function deleteNoteAction(noteId: string) {
  await db.note.delete({ where: { id: noteId } })
  revalidatePath('/')
}

export async function archiveNoteAction(noteId: string) {
  await db.note.update({
    where: { id: noteId },
    data: {
      isArchived: true,
    },
  })

  revalidatePath('/')
}

export async function unarchiveNoteAction(noteId: string) {
  await db.note.update({
    where: { id: noteId },
    data: {
      isArchived: false,
    },
  })

  revalidatePath('/')
}

export async function createTagAction(tag: string, userId: string) {
  const newTag = await db.tag.create({
    data: {
      name: tag,
      userId,
    },
  })

  revalidateTag('availableTags')

  return { newTag }
}
