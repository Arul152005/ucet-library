# Library Management System - Backend

This is the backend for the Library Management System built with Node.js and Express.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository (if not already cloned)
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the Server

#### Development Mode
```
npm run dev
```
This will start the server with nodemon, which automatically restarts the server when code changes are detected.

#### Production Mode
```
npm start
```
This will start the server in production mode.

The server will start on port 5000 by default. You can change the port by setting the PORT environment variable in the `.env` file.

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book
- `POST /api/books/:id/borrow` - Borrow a book (requires studentId in body)
- `POST /api/books/:id/return` - Return a book

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student by ID
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `POST /api/students/:id/borrowed-books` - Add a borrowed book to a student
- `DELETE /api/students/:id/borrowed-books` - Remove a borrowed book from a student

## Database Schema

### Books
- `title` (String, required) - The title of the book
- `author` (String, required) - The author of the book
- `isbn` (String, required, unique) - The ISBN of the book
- `available` (Boolean, default: true) - Availability status of the book
- `takenBy` (String, default: null) - Student ID of who has taken the book
- `takenDate` (Date, default: null) - Date when the book was taken

### Students
- `name` (String, required) - The name of the student
- `email` (String, required, unique) - The email of the student
- `studentId` (String, required, unique) - The student ID
- `borrowedBooks` (Array) - List of borrowed books with details

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
- `PORT` - The port to run the server on (default: 5000)
- `NODE_ENV` - The environment (default: development)
- `MONGO_URI` - MongoDB connection string