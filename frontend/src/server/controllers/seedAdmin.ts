import mongoose from 'mongoose';
import User from '../models/User'; 
import * as bcrypt from 'bcrypt';
import connectToDatabase from '../../lib/mongodb';

const createAdmin = async () => {

    await connectToDatabase();

  // Check if an admin already exists
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin', 10);

  const adminUser = new User({
    email: 'admin@gmail.com',
    password: hashedPassword,
    name:'admin',
    role: 'admin',
  });

  await adminUser.save();
  console.log('Admin user created successfully.');
};

createAdmin().then(() => mongoose.disconnect());


//To execute the script, add the following command to your package.json
// "scripts": {
//   "seed": "ts-node seedAdmin.ts" 
// }