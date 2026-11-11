import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import apiRouter from './routes/apiRouter';
import { initSocketServer } from './sockets/socketHandler';

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Security & Parsing Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket.IO Real-time setup
const io = new SocketIOServer(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
initSocketServer(io);

// API Routing
app.use('/api/v1', apiRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Global Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

server.listen(PORT, () => {
  console.log(`[KICK BUNK 360] Server running on port ${PORT}`);
  console.log(`[KICK BUNK 360] API Base: http://localhost:${PORT}/api/v1`);
  console.log(`[KICK BUNK 360] Real-time WebSockets initialized.`);
});

export { app, server };
