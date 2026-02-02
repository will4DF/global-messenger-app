import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'will@will4df.com' },
    update: {},
    create: {
      email: 'will@will4df.com',
      username: 'will4df',
      auth0Id: 'dev_user_123',
    },
  })
  console.log('✅ Seed successful: Created user', user.username)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
