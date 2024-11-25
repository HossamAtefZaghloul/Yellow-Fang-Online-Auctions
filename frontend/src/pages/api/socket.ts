import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';

interface ExtendedNextApiResponse extends NextApiResponse {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: Server;
    };
  };
}

export default function handler(req: NextApiRequest, res: ExtendedNextApiResponse) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      socket.on('message', (data) => {
        console.log(`Message received: ${data}`);
        io.emit('message', data); // Broadcast to all clients
      });
    });

    res.socket.server.io = io;
    console.log('Socket.IO server initialized');
  }

  res.end();
}
