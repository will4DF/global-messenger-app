import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Seed a Subscription for user 1 (will4df)
  const subscription = await prisma.subscription.upsert({
    where: { userId: "1" },
    update: {},
    create: {
      userId: "1",
      plan: "PRO",
      status: "ACTIVE",
    },
  })

  // 2. Seed a Payment record
  const payment = await prisma.payment.create({
    data: {
      userId: "1",
      amount: 29.99,
      currency: "USD",
      status: "SUCCESS",
      method: "CREDIT_CARD",
    },
  })

  console.log('✅ Billing Seed successful!')
  console.log('Created Subscription:', subscription.plan)
  console.log('Created Payment of:', payment.amount)
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
