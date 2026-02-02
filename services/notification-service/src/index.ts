import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004; // Port 3004

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'UP', service: 'notification-service' }));

// Endpoint to manually trigger a notification
app.post('/send', (req, res) => {
  const { userId, message } = req.body;
  console.log(`[PUSH] Sending to User ${userId}: "${message}"`);
  res.json({ success: true, status: 'Sent' });
});

// --- THE RECURRING JOB (Course Requirement) ---
// This runs every minute: "* * * * *"
// For a daily job, you would use: "0 0 * * *" (Midnight)
cron.schedule('* * * * *', () => {
  console.log('--- [CRON JOB] Starting Daily Digest ---');
  console.log('Checking for unread messages...');
  console.log('Sending email summaries to 5 users...');
  console.log('--- [CRON JOB] Complete ---');
});

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
