import Artifact from "../server/models/Artifact";
import redis from "./redis";

async function loadAuctionsToRedis() {
  const now = new Date();
  console.log("Loading auctions into Redis...");
  
  const upcomingAuctions = await Artifact.find({
    auctionStartDate: { $gt: now },
  });

  console.log(`Found ${upcomingAuctions.length} upcoming auctions.`);

  upcomingAuctions.forEach(async (auction) => {
    const score = +new Date(auction.auctionStartDate);
    const auctionData = JSON.stringify(auction);

    await redis.zadd("auctions", score, auctionData);

    console.log(`Auction added to Redis: ${auction.name} (Start Date: ${auction.auctionStartDate})`);
  });

  console.log("All auctions have been loaded into Redis.");
}

export default loadAuctionsToRedis;
