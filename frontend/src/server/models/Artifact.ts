import mongoose, { Schema, model, Document } from 'mongoose';

export interface IArtifact extends Document {
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  auctionStartDate?: Date;
  auctionEndDate?: Date;
  auctionStatus: 'notStarted' | 'live' | 'sold';
  bids: mongoose.Types.ObjectId[]; // References to Bid documents
  currentBid?: number; // Virtual field
}

const artifactSchema = new Schema<IArtifact>({
  name: { type: String, required: false, trim: true },
  description: { type: String, required: false, trim: true },
  image: { type: String, required: false },
  startingPrice: { type: Number, required: false, min: 0 },
  auctionStartDate: { type: Date, default: Date.now, required: false },
  auctionEndDate: { type: Date, required: false },
  auctionStatus: { type: String, enum: ['notStarted', 'live', 'sold'], default: 'notStarted' },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
});

// Add a virtual field for the current bid
artifactSchema.virtual('currentBid').get(function () {
  if (!this.bids || this.bids.length === 0) return this.startingPrice;

  const bidAmounts = this.bids.map((bid: any) => bid.amount || 0);
  return Math.max(...bidAmounts);
});

// Ensure virtuals are included in JSON responses
artifactSchema.set('toJSON', { virtuals: true });
artifactSchema.set('toObject', { virtuals: true });

const Artifact = mongoose.models.Artifact || model<IArtifact>('Artifact', artifactSchema);
export default Artifact;
