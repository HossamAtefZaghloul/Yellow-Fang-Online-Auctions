import type { NextApiRequest, NextApiResponse } from 'next';
import Artifact from "../../server/models/Artifact";
import connectToDatabase from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase(); 

  if (req.method === 'POST') {
    const { auctionId } = req.body; 

    try {
      const updatedArtifact = await Artifact.findByIdAndUpdate(
        auctionId,
        { auctionStatus: 'sold' },
        { new: true }
      );

      if (!updatedArtifact) {
        return res.status(404).json({ error: 'Artifact not found' });
      }

      res.status(200).json({ message: 'Artifact updated successfully', artifact: updatedArtifact });
    } catch (error) {
      console.error('Error updating artifact:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
