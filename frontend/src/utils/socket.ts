import { io, Socket } from "socket.io-client";

let socket: Socket | undefined;

const getSocket = (): Socket => {
  if (!socket) {
    socket = io({
      path: "/api/socket",
    });
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = undefined;
  }
};

export default getSocket;
