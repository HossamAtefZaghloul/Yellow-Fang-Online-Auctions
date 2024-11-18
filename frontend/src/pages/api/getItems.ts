import { NextApiRequest, NextApiResponse } from "next";
import Artifact from "../../server/models/Artifact";
import connectToDatabase from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    await connectToDatabase();

    const now = new Date();

    const artifacts = await Artifact.find({
      auctionStartDate: { $gt: now },  
    });

    return res.status(200).json(artifacts);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "Unknown error occurred" });
  }
}
