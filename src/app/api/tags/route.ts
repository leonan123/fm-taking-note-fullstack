import { db } from '@/_lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const tags = await db.tag.findMany({
    where: {
      userId,
    },
  })

  return Response.json(tags)
}
