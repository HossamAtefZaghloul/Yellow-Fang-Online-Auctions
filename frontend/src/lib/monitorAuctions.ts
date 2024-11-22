import redis from "./redis";
import { Server } from "socket.io";
import Artifact from "../server/models/Artifact";

async function monitorAuctions(io: Server) {
  setInterval(async () => {
    const now = Date.now();

    // Fetch auctions starting now or earlier
    const auctions = await redis.zrangebyscore("auctions", 0, now);

    auctions.forEach(async (auctionData) => {
      const auction = JSON.parse(auctionData);

      // Notify clients
      io.emit("auction-started", {
        auctionId: auction._id,
        message: `Auction for ${auction.name} has started!`,
      });

      // Remove from Redis and update MongoDB
      await redis.zrem("auctions", auctionData);
      await Artifact.findByIdAndUpdate(auction._id, { status: "active" });
    });
  }, 1000);
}

export default monitorAuctions;
