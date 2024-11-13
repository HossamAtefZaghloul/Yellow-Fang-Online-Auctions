import mongoose, { Document, Schema } from 'mongoose';

interface IUserArtifact extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  artifactId: mongoose.Schema.Types.ObjectId;
  purchaseDate: Date;
  price: number;
}

const UserArtifactSchema = new Schema<IUserArtifact>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  artifactId: { type: Schema.Types.ObjectId, ref: 'Artifact', required: true },
  purchaseDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
});

const UserArtifact = mongoose.model<IUserArtifact>('UserArtifact', UserArtifactSchema);

export default UserArtifact;
