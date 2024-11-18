import { io, Socket } from 'socket.io-client';

let socket: Socket;

const getSocket = () => {
  if (!socket) {
    socket = io(); 
  }
  return socket;
};

export default getSocket;
