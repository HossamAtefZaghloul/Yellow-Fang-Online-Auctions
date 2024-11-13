// server/models/User.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' } 
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
