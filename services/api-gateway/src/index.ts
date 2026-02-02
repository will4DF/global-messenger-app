import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// ROUTE 1: User Service (Working!)
app.use('/user', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/user': '' },
}));

// ROUTE 2: Chat Service (Matches /chat-service/messages)
app.use('/chat-service', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: { '^/chat-service': '' },
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
