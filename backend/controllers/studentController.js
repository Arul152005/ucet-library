// Mock data for students
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', studentId: 'STU001' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', studentId: 'STU002' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', studentId: 'STU003' },
];

let nextId = 4;

const Student = require('../models/Student');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
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
  const { name, email, studentId } = req.body;
  
  try {
    const student = new Student({
      name,
      email,
      studentId
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
    
    const { name, email, studentId } = req.body;
    
    if (name) student.name = name;
    if (email) student.email = email;
    if (studentId) student.studentId = studentId;
    
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

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};