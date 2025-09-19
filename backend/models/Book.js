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
    trim: true,
    validate: {
      validator: function(v) {
        // Regex to validate the ISBN format (e.g., 205.A.1.1)
        return /^\d{3}\.[A-Z]\.\d+\.\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid ISBN format! Expected format: XXX.X.X.X (e.g., 205.A.1.1)`
    }
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