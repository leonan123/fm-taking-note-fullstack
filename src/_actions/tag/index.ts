'use server'

import { db } from '@/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function deleteTagAction(tagId: number) {
  const { userId } = await auth()

  await db.tag.delete({
    where: {
      id: tagId,
      userId: userId!,
    },
  })

  revalidateTag('tags')
  revalidatePath('/')
}
