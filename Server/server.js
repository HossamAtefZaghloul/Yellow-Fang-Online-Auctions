import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import multer from 'multer';
import fs from 'fs';
import http from 'http'; 
import { fileURLToPath } from 'url';

//
const PORT = process.env.PORT || 6001;
const server = http.createServer(app);
const app = express();
// dirname for ES6
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
//
const upload = multer({ storage });
//
dotenv.config();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    console.log('Database connected successfully');
  })
  .catch((error) => console.log(`${error} did not connect`));
// Ensure the 'public' folder exists
const publicDir = path.join(dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
app.use('/public', express.static(publicDir));
// MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicDir); // Absolute path to 'public'
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});


// handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

