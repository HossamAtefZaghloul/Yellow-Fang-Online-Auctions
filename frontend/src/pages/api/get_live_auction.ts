import type { NextApiRequest, NextApiResponse } from 'next';
import Artifact from "../../server/models/Artifact";
import connectToDatabase from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      // Fetch the first live auction (or any specific logic to get one)
      const liveAuction = await Artifact.findOne({ auctionStatus: 'live' });

      if (!liveAuction) {
        return res.status(404).json({ success: false, error: 'No live auction found' });
      }

      // Return the live auction as a single object
      res.status(200).json({ success: true, data: liveAuction });
    } catch (error) {
      console.error('Error fetching live auction:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
  }
}
