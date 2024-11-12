// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateUser } from '../../server/controllers/authController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try { 
            if (req.method !== 'POST') {
                return res.status(405).json({ message: 'Method Not Allowed' });
            }

            const { email, password , name } = req.body;

            if (email && name) {
                console.log('emailemailemailemailemailemail')
                const token = await authenticateUser(email, password, name); 
                if (token) {
                    return res.status(200).json({ message: 'Login successful', token });
                } else {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
            }
            else if (email && password) {
                const token = await authenticateUser(email, password, name); 
                if (token) {
                    return res.status(200).json({ message: 'Login successful', token });
                } else {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }}
    } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'An error occurred during login' });
    }
}
