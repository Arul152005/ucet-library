const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/books - Get all books (public for now, but can be protected if needed)
router.get('/', bookController.getAllBooks);

// GET /api/books/:id - Get a book by ID (public for now, but can be protected if needed)
router.get('/:id', bookController.getBookById);

// POST /api/books - Add a new book (protected)
router.post('/', protect, bookController.createBook);

// PUT /api/books/:id - Update a book (protected)
router.put('/:id', protect, bookController.updateBook);

// DELETE /api/books/:id - Delete a book (protected)
router.delete('/:id', protect, bookController.deleteBook);

// POST /api/books/:id/borrow - Borrow a book (protected)
router.post('/:id/borrow', protect, bookController.borrowBook);

// POST /api/books/:id/return - Return a book (protected)
router.post('/:id/return', protect, bookController.returnBook);

module.exports = router;