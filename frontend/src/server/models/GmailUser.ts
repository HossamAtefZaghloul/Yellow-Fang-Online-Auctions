import mongoose, { Document, Model, Schema } from 'mongoose';

interface IGmailUser extends Document {
    email: string;
    name: string;
    role: 'admin' | 'user';
}

const GmailUserSchema = new Schema<IGmailUser>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

const GmailUser: Model<IGmailUser> = mongoose.models.GmailUser || mongoose.model<IGmailUser>('GmailUser', GmailUserSchema);

export default GmailUser;
