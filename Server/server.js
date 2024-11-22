import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import { createClient } from "redis";
import { setInterval } from "node:timers"; 
import { Server } from 'socket.io';

dotenv.config();

// Constants
const PORT = process.env.PORT || 6001;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET_VALUE;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';

const app = express();
const server = http.createServer(app);

// Redis client
const redisClient = createClient();
redisClient.connect().catch(err => console.error("Redis connection error:", err));

// ES6 __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'public' folder exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use('/public', express.static(publicDir));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, publicDir),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// MongoDB connection
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error(`Database connection failed: ${error}`));

// Routes
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});




// WebSocket setup (if needed)
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("connected", "Welcome to the server!");

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// 404 Handling
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});



import Redis from "ioredis";

const redis = new Redis();

const checkUpcomingAuctions = async () => {
  try {
    // Use zrangebyscore for compatibility
    const auctions = await redis.zrangebyscore("auctions", "-inf", "+inf", "WITHSCORES");
   
    // Process the results
    for (let i = 0; i < auctions.length; i += 2) {
      const value = auctions[i];
      const score = auctions[i + 1];

      try {
        const auction = JSON.parse(value); // Parse the JSON string
        const timestamp = Number(score); // Convert score to number
        const currentTime = Date.now(); // Get the current time in milliseconds
        console.log('timestamp',timestamp);
        console.log('currentTime',currentTime);
        // Check if auctionStartDate matches the current time (within a 1-second window)
        if (Math.abs(timestamp - currentTime) <= 1000) {
          console.log(`Auction "${auction._id}" starts now!`);
          // Here you can publish to the `auction-start` channel
          redis.publish("auction-start", JSON.stringify(auction));
        }
      } catch (error) {
        console.error("Error parsing auction data:", error.message);
      }
    }
  } catch (error) {
    console.error("Error fetching auctions from Redis:", error.message);
  }
};

// Call the function to test
setInterval(checkUpcomingAuctions, 1000); // Check every second
