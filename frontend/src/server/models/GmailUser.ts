import mongoose, { Document, Model, Schema } from 'mongoose';

interface IGmailUser extends Document {
    email: string;
}

const GmailUserSchema = new Schema<IGmailUser>({
    email: { type: String, required: true, unique: true },
});

const GmailUser: Model<IGmailUser> = mongoose.models.GmailUser || mongoose.model<IGmailUser>('GmailUser', GmailUserSchema);

export default GmailUser;
