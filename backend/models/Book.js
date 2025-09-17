const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  },
  // New fields to track who has taken the book and when
  takenBy: {
    type: String,
    default: null
  },
  takenDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;