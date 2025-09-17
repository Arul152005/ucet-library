// Mock data for books
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0-7432-7356-5', available: true },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0-06-112008-4', available: false },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '978-0-452-28423-4', available: true },
];

let nextId = 4;

// Get all books
const getAllBooks = (req, res) => {
  res.json(books);
};

// Get a book by ID
const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(book => book.id === id);
  
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  res.json(book);
};

// Create a new book
const createBook = (req, res) => {
  const { title, author, isbn, available } = req.body;
  
  if (!title || !author || !isbn) {
    return res.status(400).json({ message: 'Title, author, and ISBN are required' });
  }
  
  const newBook = {
    id: nextId++,
    title,
    author,
    isbn,
    available: available !== undefined ? available : true
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
};

// Update a book
const updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  const { title, author, isbn, available } = req.body;
  
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;
  if (isbn) books[bookIndex].isbn = isbn;
  if (available !== undefined) books[bookIndex].available = available;
  
  res.json(books[bookIndex]);
};

// Delete a book
const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(book => book.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  
  books.splice(bookIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};