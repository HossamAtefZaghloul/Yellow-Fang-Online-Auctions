// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../server/models/User';
import bcrypt from 'bcrypt'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {   
        console.log('asdasdas')
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmail = await User.findOne({ email }); 
        
        if (checkEmail) {
            return res.json({ message: "Email already exists." });
          } else {
            const newUser = new User({
              email,
              password: hashedPassword,
            });
            await newUser.save(); 
            return res.json({ message: "User created successfully." });
        }} catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'An error occurred during login' });
    }
}
