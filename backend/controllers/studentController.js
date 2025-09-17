// Mock data for students
let students = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
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
    roomNumber: '101'
  },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', studentId: 'STU002' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', studentId: 'STU003' },
];

let nextId = 4;

const Student = require('../models/Student');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).populate('borrowedBooks.bookId');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('borrowedBooks.bookId');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  const { 
    name, 
    email, 
    studentId,
    course,
    year,
    gpa,
    phone,
    address,
    scholarships,
    isHosteller,
    hostelName,
    roomNumber
  } = req.body;
  
  try {
    const student = new Student({
      name,
      email,
      studentId,
      course,
      year,
      gpa,
      phone,
      address,
      scholarships,
      isHosteller,
      hostelName,
      roomNumber
    });
    
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Student with this email or student ID already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update a student
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const { 
      name, 
      email, 
      studentId,
      course,
      year,
      gpa,
      phone,
      address,
      scholarships,
      isHosteller,
      hostelName,
      roomNumber
    } = req.body;
    
    if (name !== undefined) student.name = name;
    if (email !== undefined) student.email = email;
    if (studentId !== undefined) student.studentId = studentId;
    if (course !== undefined) student.course = course;
    if (year !== undefined) student.year = year;
    if (gpa !== undefined) student.gpa = gpa;
    if (phone !== undefined) student.phone = phone;
    if (address !== undefined) student.address = address;
    if (scholarships !== undefined) student.scholarships = scholarships;
    if (isHosteller !== undefined) student.isHosteller = isHosteller;
    if (hostelName !== undefined) student.hostelName = hostelName;
    if (roomNumber !== undefined) student.roomNumber = roomNumber;
    
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Student with this email or student ID already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    await student.remove();
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a borrowed book to a student
const addBorrowedBook = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const { bookId, returnDeadline } = req.body;
    
    // Check if book is already borrowed by this student
    const isAlreadyBorrowed = student.borrowedBooks.some(borrowedBook => 
      borrowedBook.bookId.toString() === bookId
    );
    
    if (isAlreadyBorrowed) {
      return res.status(400).json({ message: 'Book is already borrowed by this student' });
    }
    
    // Add the borrowed book
    student.borrowedBooks.push({
      bookId: bookId,
      borrowedDate: new Date(),
      returnDeadline: returnDeadline
    });
    
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a borrowed book from a student
const removeBorrowedBook = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    const { bookId } = req.body;
    
    // Remove the borrowed book
    student.borrowedBooks = student.borrowedBooks.filter(borrowedBook => 
      borrowedBook.bookId.toString() !== bookId
    );
    
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  addBorrowedBook,
  removeBorrowedBook
};