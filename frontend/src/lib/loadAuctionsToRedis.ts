import Artifact from "../server/models/Artifact";
import redis from "./redis";

async function loadAuctionsToRedis(): Promise<void> {
  const now = new Date();
  console.log("Loading auctions into Redis...");

  interface Auction {
    _id: string;
    auctionStartDate: Date;
    name: string;
  }

  const upcomingAuctions: Auction[] = await Artifact.find({
    auctionStartDate: { $gt: now },
  });

  console.log(`Found ${upcomingAuctions.length} upcoming auctions.`);

  // Process each auction
  for (const auction of upcomingAuctions) {
    const auctionKey = `auction:${auction._id}`;
    const auctionData = JSON.stringify(auction);

    // Calculate TTL in seconds
    const expirationDate = new Date(auction.auctionStartDate);
    const ttl = Math.floor((expirationDate.getTime() - now.getTime()) / 1000); // Convert ms to seconds

    if (ttl > 0) {
      try {
        await redis.set(auctionKey, auctionData, "EX", ttl);
        console.log(`Auction stored: ${auction.name}`);
        console.log(`Key: ${auctionKey}, Expires in: ${ttl} seconds.`);
      } catch (error) {
        console.error(`Error storing auction: ${auction.name}`, error);
      }
    } else {
      console.log(`Skipped expired auction: ${auction.name}`);
    }
  }

  console.log("All upcoming auctions have been processed and stored in Redis.");
}

export default loadAuctionsToRedis;
