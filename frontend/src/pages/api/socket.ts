import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as HttpServer } from 'http';

const handler = (req: NextApiRequest, res: NextApiResponse & { socket: { server: HttpServer } }) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });

      // Broadcasting auction start to all clients
      socket.on('auction-started', (data) => {
        console.log('Auction started event received:', data);
        io.emit('auction-started', { message: 'Auction started: Join | Decline' });
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO already initialized.");
  }
  res.end();
};

export default handler;
