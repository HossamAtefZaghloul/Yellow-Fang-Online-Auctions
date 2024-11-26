import type { NextApiRequest, NextApiResponse } from "next";
import Bid from "../../server/models/bid";
import connectToDatabase from "../../lib/mongodb";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const liveBids = await Bid.find();

      if (!liveBids || liveBids.length === 0) {
        return res
          .status(404)
          .json({ success: false, error: "No live bids found" });
      }

      // Return all live bids
      res.status(200).json({ success: true, bids: liveBids });
    } catch (error) {
      console.error("Error fetching live bids:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res
      .status(405)
      .json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
