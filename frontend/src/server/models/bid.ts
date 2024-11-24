import mongoose, { Schema, model, Document } from 'mongoose';

export interface IBid extends Document {
  userId: string;
  userName?: string; 
  amount: number;
  timestamp: Date;
}

const bidSchema = new Schema<IBid>({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Bid = mongoose.models.Bid || model<IBid>('Bid', bidSchema);
export default Bid;
