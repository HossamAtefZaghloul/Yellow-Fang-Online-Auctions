import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as HttpServer } from "http";
import connectToDatabase from "../../lib/mongodb";
import Artifact from "../../server/models/Artifact";

interface NextApiSocketResponse extends NextApiResponse {
  socket: { server: HttpServer & { io?: Server } };
}

const handler = async (req: NextApiRequest, res: NextApiSocketResponse) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    await connectToDatabase();

    // Periodically check for auctions that need to start
    setInterval(async () => {
      try {
        const now = new Date();
        const auctionsToStart = await Artifact.find({
          auctionStartDate: { $lte: now },
          status: "scheduled", // Ensure only unsent notifications are processed
        });

        auctionsToStart.forEach(async (auction) => {
          // Broadcast auction start event
          io.emit("auction-started", {
            auctionId: auction._id,
            message: `Auction for ${auction.name} has started!`,
          });

          // Update auction status to "active" or similar to avoid re-emitting
          auction.status = "active";
          await auction.save();
        });
      } catch (error) {
        console.error("Error checking auctions:", error);
      }
    }, 10000); // Check every 10 seconds (adjust as needed)

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO already initialized.");
  }

  res.end();
};

export default handler;
