const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/students - Get all students (public for now, but can be protected if needed)
router.get('/', studentController.getAllStudents);

// GET /api/students/:id - Get a student by ID (public for now, but can be protected if needed)
router.get('/:id', studentController.getStudentById);

// POST /api/students - Add a new student (protected)
router.post('/', protect, studentController.createStudent);

// PUT /api/students/:id - Update a student (protected)
router.put('/:id', protect, studentController.updateStudent);

// DELETE /api/students/:id - Delete a student (protected)
router.delete('/:id', protect, studentController.deleteStudent);

// POST /api/students/:id/borrowed-books - Add a borrowed book to a student (protected)
router.post('/:id/borrowed-books', protect, studentController.addBorrowedBook);

// DELETE /api/students/:id/borrowed-books - Remove a borrowed book from a student (protected)
router.delete('/:id/borrowed-books', protect, studentController.removeBorrowedBook);

module.exports = router;