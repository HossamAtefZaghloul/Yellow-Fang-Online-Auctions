import mongoose, { Schema, model, Document } from 'mongoose';

interface IArtifact extends Document {
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  auctionStartDate?: Date;
  auctionEndDate: Date;
  sold: boolean;
}

const artifactSchema = new Schema<IArtifact>({
  name: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String,  // Optional
    required: false
  },
  startingPrice: {
    type: Number,
    required: false,
    min: 0
  },
  auctionStartDate: {
    type: Date,
    default: Date.now,
    required: false,
  },
  auctionEndDate: {
    type: Date,  // Optional
    required: false
  },
  sold: {
    type: Boolean,
    required: false,
  }
});

// Check if the model already exists in mongoose.models to avoid overwriting
const Artifact = mongoose.models.Artifact || model<IArtifact>('Artifact', artifactSchema);

export default Artifact;
