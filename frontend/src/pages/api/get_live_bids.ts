import type { NextApiRequest, NextApiResponse } from "next";
import Artifact from "../../server/models/Artifact"; // Import the Artifact model
import connectToDatabase from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "GET") {
    const { auctionId } = req.query; // Extract auctionId from query parameters

    if (!auctionId) {
      return res
        .status(400)
        .json({ success: false, error: "Auction ID is required" });
    }

    try {
      // Fetch the artifact by auctionId
      const artifact = await Artifact.findById(auctionId).populate('bids');

      if (!artifact) {
        return res
          .status(404)
          .json({ success: false, error: "Auction not found" });
      }

      if (!artifact.bids || artifact.bids.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "No live bids found for the given auction" });
      }

      // Return the bids
      res.status(200).json({ success: true, bids: artifact.bids });
    } catch (error) {
      console.error("Error fetching bids:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
