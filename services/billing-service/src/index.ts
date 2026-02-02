import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'UP', service: 'billing-service' }));

// 1. Get Current Plan
app.get('/plan/:userId', async (req, res) => {
  const sub = await prisma.subscription.findUnique({ where: { userId: req.params.userId } });
  res.json(sub || { plan: 'FREE', status: 'ACTIVE' });
});

// 2. Get Payment History (Receipts)
app.get('/history/:userId', async (req, res) => {
  const history = await prisma.payment.findMany({
    where: { userId: req.params.userId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(history);
});

// 3. Process a Payment (Upgrade Plan)
app.post('/pay', async (req, res) => {
  const { userId, amount, plan } = req.body;

  try {
    // A. Record the Transaction
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        status: 'SUCCESS'
      }
    });

    // B. Update the User's Plan
    const sub = await prisma.subscription.upsert({
      where: { userId },
      update: { plan, status: 'ACTIVE' },
      create: { userId, plan, status: 'ACTIVE' }
    });

    res.json({ success: true, payment, plan: sub });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Billing Service running on port ${PORT}`);
});
