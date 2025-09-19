const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Sample book data with the new ISBN format
const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '205.A.1.1',
    available: true
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '205.A.1.2',
    available: false,
    takenBy: 'STU002',
    takenDate: new Date('2025-09-15')
  },
  {
    title: '1984',
    author: 'George Orwell',
    isbn: '205.A.1.3',
    available: true
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '205.A.1.4',
    available: true
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '205.A.1.5',
    available: true
  },
  {
    title: 'Lord of the Flies',
    author: 'William Golding',
    isbn: '205.A.1.6',
    available: false,
    takenBy: 'STU004',
    takenDate: new Date('2025-09-10')
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '205.A.1.7',
    available: true
  },
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    isbn: '205.A.1.8',
    available: true
  }
];

const importData = async () => {
  try {
    // Clear existing books
    await Book.deleteMany();
    console.log('Existing books cleared');

    // Insert new books
    await Book.insertMany(books);
    console.log('Books imported successfully');

    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();