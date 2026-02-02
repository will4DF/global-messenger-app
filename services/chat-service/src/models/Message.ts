import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, default: 'text' },
  createdAt: { type: Date, default: Date.now }
});

// Indexing makes searching for chat history fast
MessageSchema.index({ senderId: 1, receiverId: 1 });

export default mongoose.model('Message', MessageSchema);
