import Redis from "ioredis";
import { Server } from "socket.io";
import http from "http";



const redis = new Redis();

// Function to monitor upcoming auctions
const checkUpcomingAuctions = async () => {
  try {
    const currentTime = Date.now(); // Get the current time in milliseconds

    // Fetch only auctions with timestamps >= currentTime
    const auctions = await redis.zrangebyscore("auctions", currentTime, "+inf", "WITHSCORES");

    for (let i = 0; i < auctions.length; i += 2) {
      const value = auctions[i];
      const score = auctions[i + 1];

      try {
        const auction = JSON.parse(value); // Parse the JSON string
        const timestamp = Number(score); // Convert score to number

        console.log("Auction Timestamp:", timestamp);
        console.log("Current Time:", currentTime);

        // Check if auctionStartDate matches the current time (within a 1-second window)
        if (Math.abs(timestamp - currentTime) <= 1000) {
          console.log(`Auction "${auction._id}" starts now!`);

          // Publish to the "auction-start" channel
          redis.publish("auction-start", JSON.stringify(auction));

          // Emit to connected clients via Socket.IO
          io.emit("auction-start", auction);
        }
      } catch (error) {
        console.error("Error parsing auction data:", error.message);
      }
    }
  } catch (error) {
    console.error("Error fetching auctions from Redis:", error.message);
  }
};

// Call the function periodically to monitor upcoming auctions
setInterval(checkUpcomingAuctions, 1000); // Check every second

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

