'use server'

import { db } from '@/_lib/prisma'
import { revalidatePath } from 'next/cache'

interface createNoteAction {
  userId: string
  id?: string
  title: string
  content: string | null
  tags?: string
  updatedAt?: string | null
}

export async function upsertNoteAction(data: createNoteAction) {
  // TODO: add tags
  await db.note.upsert({
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

  revalidatePath('/')
}
