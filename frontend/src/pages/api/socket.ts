import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as HttpServer } from 'http';
import { Socket as NetSocket } from 'net';
import cron from 'node-cron';

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HttpServer & {
      io?: Server;
    };
  };
};

const handler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO server...');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    // Handle Socket.IO connections
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
      });
    });

    // Schedule the 7 PM notification
    cron.schedule('0 19 * * *', () => {
      console.log('Broadcasting auction notification...');
      io.emit('auction-started', { message: 'Auction started: Join | Decline' });
    });
  } else {
    console.log('Socket.IO server already initialized.');
  }

  res.end();
};

export default handler;
