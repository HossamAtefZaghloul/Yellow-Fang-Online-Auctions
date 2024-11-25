import User from '../models/User';
import GmailUser from '../models/GmailUser';

import jwt from 'jsonwebtoken';
import connectToDatabase from '../../lib/mongodb';
import bcrypt from 'bcrypt';

export const authenticateUser = async (email: string, password: string, name: string): Promise<string | null> => {
    await connectToDatabase();
    const user = await User.findOne({ email });
    const gmailUser = await GmailUser.findOne({ email });
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'default_secret_key';

    if (gmailUser) {
        // console.log('namenamenamenamenamenamenamenamenamenamenamenamenamename')

        const token = jwt.sign({ userId: gmailUser._id ,email: gmailUser.email, name: gmailUser.name, role: gmailUser.role}, JWT_SECRET_KEY, { expiresIn: '1h' });
        return JSON.stringify ({token,});
    }
    else {

        if (user && (await bcrypt.compare(password, user.password))) {
    
            const token = jwt.sign({ userId: user._id, email, name:user.name, role: user.role}, JWT_SECRET_KEY, { expiresIn: '1h' });
            
            return JSON.stringify ({token});
        }
        else if (name) {
            // console.log('!user!user!user!user!user!user!user!user!user!user!user!user')
            
            const newUser =  new GmailUser({
                email,
                name,
            });
            const token = jwt.sign({ userId: newUser._id ,email, name, role: newUser.role}, JWT_SECRET_KEY, { expiresIn: '1h' });
            await newUser.save(); 
            return JSON.stringify ({token,email});
        }
    }

    return null;
};


