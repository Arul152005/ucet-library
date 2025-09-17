// Mock data for students
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', studentId: 'STU001' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', studentId: 'STU002' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', studentId: 'STU003' },
];

let nextId = 4;

// Get all students
const getAllStudents = (req, res) => {
  res.json(students);
};

// Get a student by ID
const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(student => student.id === id);
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  res.json(student);
};

// Create a new student
const createStudent = (req, res) => {
  const { name, email, studentId } = req.body;
  
  if (!name || !email || !studentId) {
    return res.status(400).json({ message: 'Name, email, and student ID are required' });
  }
  
  // Check if student with same email or studentId already exists
  const existingStudent = students.find(
    student => student.email === email || student.studentId === studentId
  );
  
  if (existingStudent) {
    return res.status(409).json({ message: 'Student with this email or student ID already exists' });
  }
  
  const newStudent = {
    id: nextId++,
    name,
    email,
    studentId
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
};

// Update a student
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(student => student.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  const { name, email, studentId } = req.body;
  
  // Check if another student already has this email or studentId
  const duplicateStudent = students.find(
    student => (student.email === email || student.studentId === studentId) && student.id !== id
  );
  
  if (duplicateStudent) {
    return res.status(409).json({ message: 'Another student with this email or student ID already exists' });
  }
  
  if (name) students[studentIndex].name = name;
  if (email) students[studentIndex].email = email;
  if (studentId) students[studentIndex].studentId = studentId;
  
  res.json(students[studentIndex]);
};

// Delete a student
const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(student => student.id === id);
  
  if (studentIndex === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  students.splice(studentIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};