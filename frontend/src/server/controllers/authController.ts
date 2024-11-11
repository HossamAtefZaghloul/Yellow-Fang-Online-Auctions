
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if password matches (use bcrypt or similar in production)
    if (user && user.password === password) { 
        // Generate a JWT token (replace 'your_jwt_secret' with a secure secret)
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        return token;
    }

    return null;
};
