const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Sample admin data
const admins = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
  },
  {
    username: 'libraryadmin',
    email: 'library@admin.com',
    password: 'library123',
  }
];

const importData = async () => {
  try {
    // Clear existing admins
    await Admin.deleteMany();
    console.log('Existing admins cleared');

    // Insert new admins using the model to ensure pre-save middleware is triggered
    for (const adminData of admins) {
      const admin = new Admin(adminData);
      await admin.save();
    }
    
    console.log('Admins imported successfully');

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();