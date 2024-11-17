import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import upload from "../../lib/upload";
import Artifact from "../../server/models/Artifact";
import connectToDatabase from "../../lib/mongodb";
import { parse, isValid } from "date-fns"; // For date parsing

interface MulterNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File; 
  body: {
    name?: string;
    description?: string;
    startingPrice?: string;
    auctionStartDate?: string;
  };
}

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        reject(result);
      } else {
        resolve(result);
      }
    });
  });

export default async function handler(
  req: MulterNextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to the database
    await connectToDatabase();
    console.log("asdxcxxzczxvvvjvmvmvmvmvmv");

    // Run Multer middleware to handle file upload
    await runMiddleware(req, res, upload.single("file"));

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Extract and validate the body fields
    const { name, description, startingPrice, auctionStartDate } = req.body;
    console.log(name);
    console.log(description);
    console.log(startingPrice);
    console.log(auctionStartDate);
    console.log(req.file);

    if (!name || !description || !startingPrice || !auctionStartDate) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const parsedPrice = Number(startingPrice);
    if (isNaN(parsedPrice)) {
      return res
        .status(400)
        .json({ message: "Starting price must be a valid number." });
    }

    // Parse and validate the auction start date
    console.log(auctionStartDate);
    const acceptedFormats = ["MM/dd/yyyy HH:mm a", "yyyy-MM-dd'T'HH:mm:ss"];
    console.log(acceptedFormats);

    const parsedDate = acceptedFormats
      .map((format) => parse(auctionStartDate, format, new Date()))
      .find(isValid);
      console.log(parsedDate);


    const newItem = new Artifact({
      image: `/uploads/${req.file.filename}`, // Save image path
      name,
      description,
      startingPrice: parsedPrice,
      auctionStartDate: parsedDate,
    });
    console.log("newItem:" + newItem);
    await newItem.save();

    return res.status(201).json({
      message: "Artifact uploaded successfully",
      artifact: newItem,
    });
  } catch (error) {
    console.error("Upload error:", error);

    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: error.message });
    }

    return res.status(500).json({
      message: "Failed to upload artifact",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// Disable Next.js body parsing
export const config = {
  api: { bodyParser: false },
};
