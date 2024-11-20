// import { Server as SocketIOServer } from "socket.io";
// import { NextApiRequest, NextApiResponse } from "next";

// type NextApiResponseWithSocket = NextApiResponse & {
//   socket: {
//     server: {
//       io?: SocketIOServer;
//     };
//   };
// };

// export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
//   if (!res.socket.server.io) {
//     console.log("Initializing Socket.IO...");

//     const io = new SocketIOServer(res.socket.server, {
//       path: "/api/socket",
//       cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//       },
//     });

//     io.on("connection", (socket) => {
//       console.log("New client connected:", socket.id);

//       // Listener for general messages
//       socket.on("message", (msg) => {
//         console.log("Message received:", msg);
//         io.emit("message", msg); // Broadcast message to all clients
//       });

//       // Listener for auction-started event
//       socket.on("auction-started", (data) => {
//         console.log("Auction started event received:", data);
//         io.emit("auction-started", { message: "Auction started: Join | Decline" });
//       });

//       socket.on("disconnect", () => {
//         console.log("Client disconnected:", socket.id);
//       });
//     });

//     res.socket.server.io = io; // Attach to the server
//   } else {
//     console.log("Socket.IO already initialized.");
//   }

//   res.end();
}

