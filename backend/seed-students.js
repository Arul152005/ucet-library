const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Sample student data
const students = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    studentId: 'STU001'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    studentId: 'STU002'
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    studentId: 'STU003'
  },
  {
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    studentId: 'STU004'
  },
  {
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    studentId: 'STU005'
  },
  {
    name: 'Diana Davis',
    email: 'diana.davis@example.com',
    studentId: 'STU006'
  },
  {
    name: 'Ethan Miller',
    email: 'ethan.miller@example.com',
    studentId: 'STU007'
  },
  {
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    studentId: 'STU008'
  }
];

const importData = async () => {
  try {
    // Clear existing students
    await Student.deleteMany();
    console.log('Existing students cleared');

    // Insert new students
    await Student.insertMany(students);
    console.log('Students imported successfully');

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();