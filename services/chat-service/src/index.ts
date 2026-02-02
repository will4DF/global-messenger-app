import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// MongoDB Message Schema
const messageSchema = new mongoose.Schema({
  senderId: Number,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/messenger')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// THE MISSING ENDPOINT: Fetching messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

// NEW ENDPOINT: Sending a message
app.post('/send', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

app.listen(PORT, () => {
  console.log(`Chat Service running on port ${PORT}`);
});
