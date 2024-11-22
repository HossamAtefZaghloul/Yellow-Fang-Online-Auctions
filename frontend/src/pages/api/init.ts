import type { NextApiRequest, NextApiResponse } from "next";
import loadAuctionsToRedis from "../../lib/loadAuctionsToRedis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log("Initializing Redis with auctions...");
      await loadAuctionsToRedis();
      return res.status(200).json({ message: "Auctions loaded into Redis." });
    } catch (error) {
      console.error("Error initializing Redis:", error);
      return res.status(500).json({ error: "Failed to load auctions into Redis." });
    }
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
