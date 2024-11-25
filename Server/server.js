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
import { createClient } from 'redis';
import { Server } from 'socket.io';
import Redis from 'ioredis';
import axios from 'axios';

dotenv.config();
// Constants
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const SECRET = process.env.SECRET_VALUE;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// App and Server Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true },
});

// Redis Client
const redis = new Redis();

// Ensure 'public' directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// Middleware
app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use('/public', express.static(publicDir));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, publicDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid or expired token' });
    req.userId = decoded.userId;
    next();
  });
};

// MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((error) => console.error(`Database connection failed: ${error}`));

// WebSocket Setup
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Notify place-live-bid
app.post("/place-live-bid", (req, res) => {
  const newBid = req.body; 

  console.log("place-live-bid :", newBid);

  // Emit the new bid to all clients
  io.emit("placed-live-bid", newBid);

  res.status(200).json({ success: true, message: "Live bids notification sent." });
});

// Notify Live Bids Route
app.post("/notify-live-bids", (req, res) => {
  const liveBids = req.body.liveBids; 

  console.log("Received live bids:", liveBids);

  io.emit('new-live-bids', liveBids);

  res.status(200).json({ success: true, message: "Live bids notification sent." });
});

// Function to Listen for Expired Keys in Redis
function listenForExpiredKeys() {
  // Create a Redis client for Pub/Sub
  const subscriber = redis.duplicate();

  // Subscribe to the expired events channel
  subscriber.subscribe("__keyevent@0__:expired", (err) => {
    if (err) {
      console.error("Failed to subscribe to expired events", err);
    } else {
      console.log("Subscribed to key expiration events.");
    }
  });

  // Listen for messages on the channel
  subscriber.on("message", async (channel, expiredKey) => {
    console.log(`Key expired: ${expiredKey}`);
    io.emit('auction-start');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateArtifact`, {
        id: expiredKey,
        auctionStatus: 'live',
      });

      if (response.status === 200) {
        console.log(`Artifact with ID ${expiredKey} is now live.`);
      } else {
        console.log(`Failed to update artifact. Response:`, response.data);
      }
    } catch (error) {
      console.error(`Error updating artifact:`, error);
    }
  });
}

listenForExpiredKeys();

// 404 Handling
app.use((req, res) => res.status(404).json({ message: 'Endpoint not found' }));
// function disconnectAllUsers() {
//   const connectedSockets = io.sockets.sockets;
  
//   connectedSockets.forEach((socket) => {
//     socket.disconnect(true); // true ensures a forced disconnection
//   });

//   console.log("All clients have been disconnected.");
// }

// // Example: Call this function based on some event
// setTimeout(() => {
//   disconnectAllUsers(); // Disconnect all clients after 10 seconds (example)
// }, 10000); // Change as per your requirements