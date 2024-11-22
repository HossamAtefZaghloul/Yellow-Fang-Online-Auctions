import Redis from "ioredis";

const redis = new Redis(); // Create a Redis client instance

// Subscribe to the "auction-start" channel
const startAuctionMonitor = () => {
  const subscriber = new Redis(); // Create a separate Redis client for subscribing
  subscriber.subscribe("auction-start", (err) => {
    if (err) {
      console.error("Failed to subscribe to channel:", err.message);
    } else {
      console.log("Subscribed to auction-start channel.");
    }
  });

  // Handle incoming messages
  subscriber.on("message", (channel, message) => {
    if (channel === "auction-start") {
      console.log("Auction event received:", message);
      const auction = JSON.parse(message);
      console.log(`Auction "${auction.name}" starts now!`);
    }
  });
};

// Start monitoring auctions
startAuctionMonitor();