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

### API Endpoints

#### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book by ID
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

#### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student by ID
- `POST /api/students` - Add a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Environment Variables

Create a `.env` file in the backend directory with the following variables:
- `PORT` - The port to run the server on (default: 5000)
- `NODE_ENV` - The environment (default: development)