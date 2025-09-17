# UCET Library Management System

This is a Library Management System with a React frontend and Node.js backend.

## Project Structure

- `Frontend/` - React application for the user interface
- `backend/` - Node.js/Express API for backend services

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd Frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your MongoDB connection string:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     NODE_ENV=development
     ```

4. Start the development server:
   ```
   npm run dev
   ```

## Git and GitHub Setup

1. Create a new repository on GitHub (do not initialize with README)
2. Update the remote URL with your GitHub username:
   ```
   git remote set-url origin https://github.com/YOUR_USERNAME/ucet-library.git
   ```
3. Push the code to GitHub:
   ```
   git push -u origin main
   ```

## Database Schema

### Books
- `title` (String, required) - The title of the book
- `author` (String, required) - The author of the book
- `isbn` (String, required, unique) - The ISBN of the book
- `available` (Boolean, default: true) - Availability status of the book

### Students
- `name` (String, required) - The name of the student
- `email` (String, required, unique) - The email of the student
- `studentId` (String, required, unique) - The student ID

## API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student by ID
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student