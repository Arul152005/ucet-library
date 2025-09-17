// Mock data for books
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', available: true },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', available: false },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', available: true },
];

let nextId = 4;

const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { title, author, isbn, available } = req.body;
  
  try {
    const book = new Book({
      title,
      author,
      isbn,
      available
    });
    
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    const { title, author, isbn, available, takenBy, takenDate } = req.body;
    
    if (title) book.title = title;
    if (author) book.author = author;
    if (isbn) book.isbn = isbn;
    
    // Handle availability changes
    if (available !== undefined) {
      book.available = available;
      
      // If book is being borrowed (available -> false)
      if (!available && takenBy) {
        book.takenBy = takenBy;
        book.takenDate = takenDate || new Date();
      }
      
      // If book is being returned (available -> true)
      if (available) {
        book.takenBy = null;
        book.takenDate = null;
      }
    }
    
    // Allow direct updating of takenBy and takenDate
    if (takenBy !== undefined) book.takenBy = takenBy;
    if (takenDate !== undefined) book.takenDate = takenDate;
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrow a book (set available to false and add student info)
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    if (!book.available) {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }
    
    const { studentId } = req.body;
    
    if (!studentId) {
      return res.status(400).json({ message: 'Student ID is required' });
    }
    
    book.available = false;
    book.takenBy = studentId;
    book.takenDate = new Date();
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return a book (set available to true and clear student info)
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    if (book.available) {
      return res.status(400).json({ message: 'Book is already available' });
    }
    
    book.available = true;
    book.takenBy = null;
    book.takenDate = null;
    
    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
};