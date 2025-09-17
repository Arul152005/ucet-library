const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const booksRouter = require('./routes/books');
const studentsRouter = require('./routes/students');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', booksRouter);
app.use('/api/students', studentsRouter);

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Library Management System Backend is running!' });
});

module.exports = app;