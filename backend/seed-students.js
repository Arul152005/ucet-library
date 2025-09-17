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
    studentId: 'STU001',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 3.8,
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA',
    scholarships: [
      { name: 'Scholarship A', description: 'Full Tuition' },
      { name: 'Scholarship B', description: '$2000 per semester' },
      { name: 'Scholarship C', description: '$1000 per year' }
    ],
    isHosteller: true,
    hostelName: 'ABC Hostel',
    roomNumber: '101',
    borrowedBooks: []
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    studentId: 'STU002',
    course: 'Electrical Engineering',
    year: '2nd Year',
    gpa: 3.5,
    phone: '(234) 567-8901',
    address: '456 Oak Ave, Another City, USA',
    scholarships: [
      { name: 'Merit Scholarship', description: '$1500 per semester' }
    ],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    studentId: 'STU003',
    course: 'Mechanical Engineering',
    year: '4th Year',
    gpa: 3.2,
    phone: '(345) 678-9012',
    address: '789 Pine Rd, Somewhere, USA',
    scholarships: [],
    isHosteller: true,
    hostelName: 'XYZ Hostel',
    roomNumber: '205',
    borrowedBooks: []
  },
  {
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    studentId: 'STU004',
    course: 'Business Administration',
    year: '1st Year',
    gpa: 3.9,
    phone: '(456) 789-0123',
    address: '321 Elm St, Nowhere, USA',
    scholarships: [
      { name: 'Dean\'s List Scholarship', description: '$1000 per semester' },
      { name: 'Leadership Award', description: '$500 one-time' }
    ],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    studentId: 'STU005',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 3.7,
    phone: '(567) 890-1234',
    address: '654 Maple Dr, Everywhere, USA',
    scholarships: [],
    isHosteller: true,
    hostelName: 'ABC Hostel',
    roomNumber: '112',
    borrowedBooks: []
  },
  {
    name: 'Diana Davis',
    email: 'diana.davis@example.com',
    studentId: 'STU006',
    course: 'Mathematics',
    year: '2nd Year',
    gpa: 4.0,
    phone: '(678) 901-2345',
    address: '987 Cedar Ln, Anyplace, USA',
    scholarships: [
      { name: 'Academic Excellence', description: 'Full Tuition' }
    ],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'Ethan Miller',
    email: 'ethan.miller@example.com',
    studentId: 'STU007',
    course: 'Physics',
    year: '4th Year',
    gpa: 3.4,
    phone: '(789) 012-3456',
    address: '147 Birch Way, Someplace, USA',
    scholarships: [],
    isHosteller: true,
    hostelName: 'XYZ Hostel',
    roomNumber: '308',
    borrowedBooks: []
  },
  {
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    studentId: 'STU008',
    course: 'Chemistry',
    year: '1st Year',
    gpa: 3.6,
    phone: '(890) 123-4567',
    address: '258 Spruce Pl, Anywhere, USA',
    scholarships: [
      { name: 'Science Scholarship', description: '$2000 per semester' }
    ],
    isHosteller: false,
    borrowedBooks: []
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