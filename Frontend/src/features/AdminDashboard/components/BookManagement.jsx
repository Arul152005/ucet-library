        import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { booksAPI } from '../../../services/api';

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        available: true
    });

    // Fetch books from the backend
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const data = await booksAPI.getAllBooks();
            setBooks(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Load books when component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            available: e.target.checked
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentBook) {
                // Update existing book
                await booksAPI.updateBook(currentBook._id, formData);
            } else {
                // Create new book
                await booksAPI.createBook(formData);
            }
            // Reset form and close dialog
            setFormData({
                title: '',
                author: '',
                isbn: '',
                available: true
            });
            setCurrentBook(null);
            setOpenDialog(false);
            // Refresh books list
            fetchBooks();
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle edit book
    const handleEditBook = (book) => {
        setCurrentBook(book);
        setFormData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            available: book.available
        });
        setOpenDialog(true);
    };

    // Handle delete book
    const handleDeleteBook = async (id) => {
        try {
            await booksAPI.deleteBook(id);
            fetchBooks();
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle borrow book
    const handleBorrowBook = async (bookId) => {
        const studentId = prompt('Enter Student ID:');
        if (studentId) {
            try {
                await booksAPI.borrowBook(bookId, studentId);
                fetchBooks(); // Refresh the book list
            } catch (err) {
                setError(err.message);
            }
        }
    };

    // Handle return book
    const handleReturnBook = async (bookId) => {
        try {
            await booksAPI.returnBook(bookId);
            fetchBooks(); // Refresh the book list
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle add new book
    const handleAddBook = () => {
        setCurrentBook(null);
        setFormData({
            title: '',
            author: '',
            isbn: '',
            available: true
        });
        setOpenDialog(true);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="p-6 max-w-[1200px] m-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Book Management</h1>
                <Button variant="contained" onClick={handleAddBook}>
                    Add New Book
                </Button>
            </div>

            {error && (
                <Alert severity="error" className="mb-4">
                    {error}
                </Alert>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                    <span className="ml-3 text-lg text-primary">Loading books...</span>
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>Available</TableCell>
                                <TableCell>Taken By</TableCell>
                                <TableCell>Taken Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book._id}>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell>
                                        <span style={{ color: book.available ? 'green' : 'red' }}>
                                            {book.available ? 'Yes' : 'No'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{book.takenBy || 'N/A'}</TableCell>
                                    <TableCell>{book.takenDate ? formatDate(book.takenDate) : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            onClick={() => handleEditBook(book)}
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </Button>
                                        {book.available ? (
                                            <Button 
                                                variant="outlined" 
                                                color="primary" 
                                                size="small" 
                                                onClick={() => handleBorrowBook(book._id)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Borrow
                                            </Button>
                                        ) : (
                                            <Button 
                                                variant="outlined" 
                                                color="secondary" 
                                                size="small" 
                                                onClick={() => handleReturnBook(book._id)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Return
                                            </Button>
                                        )}
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            size="small" 
                                            onClick={() => handleDeleteBook(book._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Book Form Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {currentBook ? 'Edit Book' : 'Add New Book'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
                            <TextField
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                label="Author"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                label="ISBN"
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleInputChange}
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleCheckboxChange}
                                />
                                Available
                            </label>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            {currentBook ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default BookManagement;