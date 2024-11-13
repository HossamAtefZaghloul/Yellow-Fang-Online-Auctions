import User from '../models/User';
import GmailUser from '../models/GmailUser';

import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export const authenticateUser = async (email: string, password: string): Promise<string | null> => {
    await connectToDatabase();
    const user = await User.findOne({ email });
    const gmailUser = await GmailUser.findOne({ email });
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

    if (gmailUser) {
        // console.log('namenamenamenamenamenamenamenamenamenamenamenamenamename')

        const token = jwt.sign({ userId: gmailUser._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
        console.log(token);
        return token;
    }
    else {

        if (user && (await bcrypt.compare(password, user.password))) {
             console.log(user)
    
            const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
            console.log(token);
            return token;
        }
        else if (gmailUser) {
            // console.log('!user!user!user!user!user!user!user!user!user!user!user!user')
            
            const newUser =  new GmailUser({
                email,
            });
            console.log('New user object:', newUser);
            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET_KEY, { expiresIn: '1h' });
            await newUser.save(); 
            return token;
        }
    }

    return null;
};


