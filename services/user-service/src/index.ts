import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'user-service' });
});

// THE MISSING PIECE: Handing the profile request
app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Returning your student data (later you can pull this from Prisma)
    res.json({
      id: id,
      name: "William",
      gpa: "3.95",
      year: "Junior",
      major: "Computer Science at BYU-I",
      role: "AI Advertising Ops Specialist",
      languages: "Spanish (Native) | English (Fluent)"
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
