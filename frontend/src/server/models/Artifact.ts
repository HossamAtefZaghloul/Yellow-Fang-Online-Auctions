import { Schema, model, Document } from 'mongoose';

interface IArtifact extends Document {
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  auctionStartDate?: Date;
  auctionEndDate: Date;
}

const artifactSchema = new Schema<IArtifact>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  startingPrice: {
    type: Number,
    required: true,
    min: 0
  },
  auctionStartDate: {
    type: Date,
    default: Date.now
  },
  auctionEndDate: {
    type: Date,
    required: true
  },
});

const Artifact = model<IArtifact>('Artifact', artifactSchema);

export default Artifact;
