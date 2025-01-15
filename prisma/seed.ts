import { db } from '../src/_lib/prisma'
import { faker } from '@faker-js/faker'

async function main() {
  const USER_ID = 'user_2rbAf5pQfHCH9DQbEaPUtbsMk8N'
  const notes = Array.from({ length: 10 }).map(() => ({
    title: `Note - ${faker.book.title()}`,
    content: faker.lorem.paragraph({ min: 1, max: 3 }),
    userId: USER_ID,
  }))

  await db.note.deleteMany({ where: { userId: USER_ID } })
  await db.note.createMany({ data: notes })
}

main()
  .then(async () => {
    console.log('🌱 Success')
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error('🚨 Error', e)
    await db.$disconnect()
    process.exit(1)
  })
