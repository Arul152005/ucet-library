const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('./models/Student');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// New student data based on the provided information
const students = [
  {
    name: 'ARUL S',
    email: 'arul.s@example.com',
    studentId: '422422205015',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '9841214371',
    address: '34 OTHAVADAI BRAMINAR STREET , CHEYYAR, THIRUVANNAMALAI.',
    fatherName: 'SAMPATH K',
    motherName: 'ELEZABATH RANI K',
    fatherMobile: '9841214371',
    motherMobile: '6381733560',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'RAKSHAYA S',
    email: 'rakshaya.s@example.com',
    studentId: '422422205032',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '8056399737',
    address: '5/62, SOUTH STREET, THIRUTHALAIYUR POST MUSIRI TALUK, TRICHY.',
    fatherName: 'SUDHAKAR S',
    motherName: 'JAYANTHI C',
    fatherMobile: '9751539618',
    motherMobile: '8056399737',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'RAJAPANDI A',
    email: 'rajapandi.a@example.com',
    studentId: '422422205043',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '9994083004',
    address: '441 GUDALUR, ALANGUDI , PUDUKKOTTAI.',
    fatherName: 'ARANGULAVAN K',
    motherName: 'MALLIKA A',
    fatherMobile: '9994083004',
    motherMobile: '7708673742',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'RABINSON R',
    email: 'rabinson.r@example.com',
    studentId: '422422205055',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '9600447626',
    address: '1/57 INDIRA NAGAR. VAGAIYUR POST, TITTAKUDI, CUDDALORE.',
    fatherName: 'RAVICHANDHIRAN S',
    motherName: 'SELVARANI R',
    fatherMobile: '9600447626',
    motherMobile: '8778029896',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'ABINEASH RAJKANTH R',
    email: 'abineash.rajkant@example.com',
    studentId: '422422104307',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '7358886062',
    address: 'NO11,VALLUAR STREET, WORAIYUR, TRICHY',
    fatherName: 'RAJINIKANTH K',
    motherName: 'UMAMAHESWARI R',
    fatherMobile: '7358886062',
    motherMobile: '9566468855',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'SHABITHLIN JOE S',
    email: 'shabithlin.joe@example.com',
    studentId: '422422205046',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '8089435266',
    address: '18/148, KONAM, , PALLIYADI, KANNIYAKUMARI.',
    fatherName: 'SYLAS A',
    motherName: 'SHYBI S',
    fatherMobile: '8089435266',
    motherMobile: '9524114139',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'NITHEES K',
    email: 'nithees.k@example.com',
    studentId: '422422126008',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '9751227966',
    address: '1/183 MARIYAMMAN KOVIL STREET, PALAYAPALAYAM, NAMAKKAL.',
    fatherName: 'KANDASAMY S',
    motherName: 'NIRMALA',
    fatherMobile: '9751227966',
    motherMobile: '9751227966',
    scholarships: [],
    isHosteller: false,
    borrowedBooks: []
  },
  {
    name: 'BOOPATHI T',
    email: 'boopathi.t@example.com',
    studentId: '422422205042',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: 0,
    phone: '9952856897',
    address: 'METTURNO.39A/111G AMMAN NAGAR, METUR DAM SALEM, SALEM.',
    fatherName: 'THANGARAJ P',
    motherName: 'DHANAM T',
    fatherMobile: '9952856897',
    motherMobile: '8012620271',
    scholarships: [],
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