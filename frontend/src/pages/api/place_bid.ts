import { NextApiRequest, NextApiResponse } from 'next';
import Artifact from "../../server/models/Artifact";
import Bid from '../../server/models/bid';
import connectToDatabase from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { auctionId, userId, userName, amount } = req.body;

  if (!auctionId || !userId || !amount) {
    return res.status(400).json({ success: false, error: 'Missing required fields.' });
  }

  await connectToDatabase(); 

  try {
    const artifact = await Artifact.findById(auctionId).populate('bids');

    if (!artifact) {
      return res.status(404).json({ success: false, error: 'Auction not found.' });
    }

    if (artifact.auctionStatus !== 'live') {
      return res.status(400).json({ success: false, error: 'Auction is not live.' });
    }

    const highestBid = artifact.bids?.length
      ? artifact.bids[artifact.bids.length - 1].amount
      : artifact.startingPrice;

    if (amount <= highestBid) {
      return res.status(400).json({ success: false, error: 'Bid must be higher than the current bid.' });
    }

    const newBid = new Bid({ userId, userName, amount });
    await newBid.save();

    artifact.bids.push(newBid._id);
    await artifact.save();

    // Emit new bid via socket.io
    const io = req.socket.server.io; 
    if (io) {
      io.to(auctionId).emit('newBid', {
        userId,
        userName,
        amount,
        timestamp: new Date(),
      });
    }

    return res.status(200).json({ success: true, message: 'Bid placed successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
}
