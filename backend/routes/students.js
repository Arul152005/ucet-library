const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /api/students - Get all students
router.get('/', studentController.getAllStudents);

// GET /api/students/:id - Get a student by ID
router.get('/:id', studentController.getStudentById);

// POST /api/students - Add a new student
router.post('/', studentController.createStudent);

// PUT /api/students/:id - Update a student
router.put('/:id', studentController.updateStudent);

// DELETE /api/students/:id - Delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;