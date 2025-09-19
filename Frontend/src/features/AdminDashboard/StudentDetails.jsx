import React, { useState, useEffect, useRef } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StudentInfo from './StudentInfo';
import LibraryInfo from './LibraryInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { booksAPI, studentsAPI } from '../../services/api';

const StudentDetails = () => {
    const [activeTab, setActiveTab] = useState('stdinfo');
    const [regNumber, setRegNumber] = useState('');
    const [isbn, setIsbn] = useState('');
    const [borrowMessage, setBorrowMessage] = useState('');
    const [borrowError, setBorrowError] = useState('');
    const [returnMessage, setReturnMessage] = useState('');
    const [returnError, setReturnError] = useState('');
    const [isBorrowing, setIsBorrowing] = useState(false);
    const [isReturning, setIsReturning] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState(''); // 'borrow' or 'return'
    const [selectedBook, setSelectedBook] = useState(null);
    const [dueAmount, setDueAmount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const isbnInputRef = useRef(null);

    // Get the register number from location state if passed
    useEffect(() => {
        if (location.state && location.state.regNumber) {
            setRegNumber(location.state.regNumber);
        }
    }, [location.state]);

    // Focus on the ISBN input field with a 3-second delay when component mounts
    useEffect(() => {
        const focusTimeout = setTimeout(() => {
            if (isbnInputRef.current) {
                isbnInputRef.current.focus();
            }
        }, 1500); // 3 seconds delay

        // Cleanup timeout if component unmounts
        return () => {
            clearTimeout(focusTimeout);
        };
    }, []);

    const handleTabClick = (tab) => {
        if (tab !== activeTab)
            setActiveTab(tab);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // If the borrow button is not disabled, trigger borrow action
            if (!isBorrowing && !isReturning) {
                if (e.target.name === 'borrow') {
                    handleBorrowBook();
                } else if (e.target.name === 'return') {
                    handleReturnBook();
                }
            }
        }
    };

    const handleBorrowBook = async () => {
        if (!isbn.trim()) {
            setBorrowError('Please enter a book ISBN');
            // Focus on the input field when there's an error
            if (isbnInputRef.current) {
                isbnInputRef.current.focus();
            }
            return;
        }

        if (!regNumber) {
            setBorrowError('Student register number not found');
            return;
        }

        try {
            setIsBorrowing(true);
            setBorrowError('');
            setBorrowMessage('');
            
            // First, get all books to find the book by ISBN
            const books = await booksAPI.getAllBooks();
            const book = books.find(b => b.isbn === isbn);
            
            if (!book) {
                setBorrowError('Book with this ISBN not found');
                setIsBorrowing(false);
                // Focus on the input field when there's an error
                if (isbnInputRef.current) {
                    isbnInputRef.current.focus();
                }
                return;
            }
            
            if (!book.available) {
                setBorrowError('This book is not available for borrowing');
                setIsBorrowing(false);
                // Focus on the input field when there's an error
                if (isbnInputRef.current) {
                    isbnInputRef.current.focus();
                }
                return;
            }
            
            // Set the book for confirmation dialog
            setSelectedBook(book);
            setDialogAction('borrow');
            setConfirmDialogOpen(true);
        } catch (err) {
            setBorrowError(err.message || 'Failed to borrow book');
            setIsBorrowing(false);
            // Focus on the input field when there's an error
            if (isbnInputRef.current) {
                isbnInputRef.current.focus();
            }
        }
    };

    const handleReturnBook = async () => {
        if (!isbn.trim()) {
            setReturnError('Please enter a book ISBN');
            // Focus on the input field when there's an error
            if (isbnInputRef.current) {
                isbnInputRef.current.focus();
            }
            return;
        }

        try {
            setIsReturning(true);
            setReturnError('');
            setReturnMessage('');
            
            // First, get all books to find the book by ISBN
            const books = await booksAPI.getAllBooks();
            const book = books.find(b => b.isbn === isbn);
            
            if (!book) {
                setReturnError('Book with this ISBN not found');
                setIsReturning(false);
                // Focus on the input field when there's an error
                if (isbnInputRef.current) {
                    isbnInputRef.current.focus();
                }
                return;
            }
            
            if (book.available) {
                setReturnError('This book is already available and not borrowed');
                setIsReturning(false);
                // Focus on the input field when there's an error
                if (isbnInputRef.current) {
                    isbnInputRef.current.focus();
                }
                return;
            }
            
            let calculatedDueAmount = 0;
            
            // Find the student to get borrowing information
            const students = await studentsAPI.getAllStudents();
            const student = students.find(s => s.studentId === regNumber);
            
            if (student) {
                // Find the borrowed book in student's record to calculate due amount
                const borrowedBook = student.borrowedBooks.find(b => {
                    // Handle different possible structures of bookId
                    let borrowedBookId;
                    
                    // If bookId is an object with _id property (populated reference)
                    if (b.bookId && b.bookId._id) {
                        borrowedBookId = b.bookId._id.toString();
                    }
                    // If bookId is a string (ObjectId reference)
                    else if (typeof b.bookId === 'string') {
                        borrowedBookId = b.bookId.toString();
                    }
                    // If bookId is an object without _id (direct object)
                    else if (b.bookId && typeof b.bookId === 'object') {
                        borrowedBookId = b.bookId.toString();
                    }
                    
                    // Compare with the book we're trying to return
                    return borrowedBookId === book._id.toString();
                });
                
                if (borrowedBook) {
                    // Calculate due amount if return is late
                    const returnDeadline = new Date(borrowedBook.returnDeadline);
                    const today = new Date();
                    
                    // Calculate days overdue (if positive, it means overdue)
                    const timeDiff = today.getTime() - returnDeadline.getTime();
                    const daysOverdue = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    
                    // Calculate due amount (Rs. 1 per day) - only if overdue
                    // Only calculate if daysOverdue > 0 (meaning after the deadline)
                    if (daysOverdue > 0) {
                        calculatedDueAmount = daysOverdue * 1;
                    }
                } else {
                    // If we can't find the borrowed book, it might be because the bookId structure is different
                    // Let's try a more flexible approach
                    const flexibleBorrowedBook = student.borrowedBooks.find(b => {
                        // Try to match any way we can
                        try {
                            // Direct comparison if both are strings
                            if (typeof b.bookId === 'string' && typeof book._id === 'string') {
                                return b.bookId === book._id;
                            }
                            
                            // If bookId is an object with _id
                            if (b.bookId && b.bookId._id) {
                                return b.bookId._id.toString() === book._id.toString();
                            }
                            
                            // If bookId is an object, convert to string and compare
                            return b.bookId.toString() === book._id.toString();
                        } catch (e) {
                            return false;
                        }
                    });
                    
                    if (flexibleBorrowedBook) {
                        // Calculate due amount if return is late
                        const returnDeadline = new Date(flexibleBorrowedBook.returnDeadline);
                        const today = new Date();
                        
                        // Calculate days overdue (if positive, it means overdue)
                        const timeDiff = today.getTime() - returnDeadline.getTime();
                        const daysOverdue = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        
                        // Calculate due amount (Rs. 1 per day) - only if overdue
                        // Only calculate if daysOverdue > 0 (meaning after the deadline)
                        if (daysOverdue > 0) {
                            calculatedDueAmount = daysOverdue * 1;
                        }
                    }
                }
            }
            
            // Set the book and due amount for confirmation dialog
            setSelectedBook(book);
            setDueAmount(calculatedDueAmount);
            setDialogAction('return');
            setConfirmDialogOpen(true);
        } catch (err) {
            setReturnError(err.message || 'Failed to return book');
            setIsReturning(false);
            // Focus on the input field when there's an error
            if (isbnInputRef.current) {
                isbnInputRef.current.focus();
            }
        }
    };

    const handleConfirmAction = async () => {
        if (dialogAction === 'borrow') {
            await confirmBorrowBook();
        } else if (dialogAction === 'return') {
            await confirmReturnBook();
        }
        
        setConfirmDialogOpen(false);
        setSelectedBook(null);
        setDueAmount(0);
        // Focus back on the ISBN input field after confirming action
        if (isbnInputRef.current) {
            isbnInputRef.current.focus();
        }
    };

    const confirmBorrowBook = async () => {
        try {
            // Borrow the book (update book record)
            await booksAPI.borrowBook(selectedBook._id, regNumber);
            
            // Also update the student record to add this book to their borrowed books
            // First, find the student by register number
            const students = await studentsAPI.getAllStudents();
            const student = students.find(s => s.studentId === regNumber);
            
            if (student) {
                // Calculate return deadline (30 days from now)
                const returnDeadline = new Date();
                returnDeadline.setDate(returnDeadline.getDate() + 30);
                
                // Add the borrowed book to the student's record
                await studentsAPI.addBorrowedBook(student._id, {
                    bookId: selectedBook._id,
                    returnDeadline: returnDeadline
                });
            }
            
            setBorrowMessage('Book borrowed successfully!');
            setIsbn(''); // Clear the ISBN field
        } catch (err) {
            setBorrowError(err.message || 'Failed to borrow book');
        } finally {
            setIsBorrowing(false);
        }
    };

    const confirmReturnBook = async () => {
        try {
            // Return the book (update book record)
            await booksAPI.returnBook(selectedBook._id);
            
            // Also update the student record to remove this book from their borrowed books
            // First, find the student by register number
            const students = await studentsAPI.getAllStudents();
            const student = students.find(s => s.studentId === regNumber);
            
            if (student) {
                // Remove the returned book from the student's record
                await studentsAPI.removeBorrowedBook(student._id, selectedBook._id);
            }
            
            // Show return message with due amount if applicable
            if (dueAmount > 0) {
                setReturnMessage(`Book returned successfully! Due amount: Rs. ${dueAmount}`);
            } else {
                setReturnMessage('Book returned successfully!');
            }
            
            setIsbn(''); // Clear the ISBN field
        } catch (err) {
            setReturnError(err.message || 'Failed to return book');
        } finally {
            setIsReturning(false);
        }
    };

    const handleCloseDialog = () => {
        setConfirmDialogOpen(false);
        setSelectedBook(null);
        setDueAmount(0);
        setIsBorrowing(false);
        setIsReturning(false);
        // Focus back on the ISBN input field when closing dialog
        if (isbnInputRef.current) {
            isbnInputRef.current.focus();
        }
    };

    return (
        <div className="min-h-[calc(100vh-102px)] bg-dimWhite p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-center py-8">
                    <ToggleButtonGroup
                        color="primary"
                        value={activeTab}
                        exclusive
                        onChange={(event, tab) => handleTabClick(tab)}
                        aria-label="Platform"
                        className="shadow-md rounded-lg overflow-hidden"
                    >
                        <ToggleButton 
                            value="stdinfo" 
                            className="px-6 py-3 text-base font-medium transition-colors duration-200"
                        >
                            Student Info
                        </ToggleButton>
                        <ToggleButton 
                            value="libinfo" 
                            className="px-6 py-3 text-base font-medium transition-colors duration-200"
                        >
                            Library Info
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                
                <div className="content bg-white rounded-xl shadow-lg p-6 mb-6">
                    {activeTab === 'stdinfo' && <StudentInfo regNumber={regNumber} />}
                    {activeTab === 'libinfo' && <LibraryInfo regNumber={regNumber} />}
                </div>
                
                {/* Book Borrowing/Returning Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">Manage Books</h2>
                    <div className="flex flex-col sm:flex-row gap-4 items-end mb-4">
                        <div className="flex-grow">
                            <TextField
                                inputRef={isbnInputRef}
                                fullWidth
                                label="Book ISBN"
                                variant="outlined"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleBorrowBook()}
                                placeholder="Enter book ISBN"
                                disabled={isBorrowing || isReturning}
                                className="rounded-lg"
                                InputProps={{
                                    className: "rounded-lg",
                                }}
                            />
                        </div>
                        <div className="w-full sm:w-auto flex gap-2">
                            <Button 
                                variant="contained" 
                                onClick={handleBorrowBook}
                                disabled={isBorrowing || isReturning}
                                className="w-full bg-secondary hover:bg-secondary/90 transition-colors duration-200 rounded-lg py-3 px-6"
                            >
                                {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
                            </Button>
                            <Button 
                                variant="outlined" 
                                onClick={handleReturnBook}
                                disabled={isBorrowing || isReturning}
                                className="w-full border-secondary text-secondary hover:bg-secondary/10 transition-colors duration-200 rounded-lg py-3 px-6"
                            >
                                {isReturning ? 'Returning...' : 'Return Book'}
                            </Button>
                        </div>
                    </div>
                    
                    {borrowMessage && (
                        <Alert severity="success" className="mt-4 rounded-lg">
                            {borrowMessage}
                        </Alert>
                    )}
                    
                    {borrowError && (
                        <Alert severity="error" className="mt-4 rounded-lg">
                            {borrowError}
                        </Alert>
                    )}
                    
                    {returnMessage && (
                        <Alert severity="success" className="mt-4 rounded-lg">
                            {returnMessage}
                        </Alert>
                    )}
                    
                    {returnError && (
                        <Alert severity="error" className="mt-4 rounded-lg">
                            {returnError}
                        </Alert>
                    )}
                </div>
            </div>
            
            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="rounded-lg"
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    className: "rounded-lg shadow-lg"
                }}
            >
                <DialogTitle 
                    id="alert-dialog-title" 
                    className="bg-primary text-white font-bold py-3 px-6"
                >
                    {dialogAction === 'borrow' ? 'Confirm Book Borrowing' : 'Confirm Book Return'}
                </DialogTitle>
                <DialogContent className="p-6">
                    {selectedBook && (
                        <DialogContentText id="alert-dialog-description">
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-bold text-lg text-primary mb-2">{selectedBook.title}</h3>
                                    <p className="text-gray-600 mb-1">Author: {selectedBook.author}</p>
                                    <p className="text-gray-600 mb-1">ISBN: {selectedBook.isbn}</p>
                                </div>
                                
                                {dialogAction === 'borrow' && (
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-secondary">
                                        <h4 className="font-medium text-secondary mb-2">Borrowing Details</h4>
                                        <p className="text-gray-700">Student Register Number: <span className="font-medium">{regNumber}</span></p>
                                        <p className="text-gray-700 mt-1">Return Deadline: <span className="font-medium">30 days from today</span></p>
                                    </div>
                                )}
                                
                                {dialogAction === 'return' && (
                                    <div className="space-y-4">
                                        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                            <h4 className="font-medium text-green-700 mb-2">Return Details</h4>
                                            <p className="text-gray-700">This book will be returned to the library and marked as available.</p>
                                        </div>
                                        
                                        {dueAmount > 0 && (
                                            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                                                <h4 className="font-medium text-yellow-800 mb-2">Overdue Notice</h4>
                                                <p className="text-yellow-700">Due amount: <span className="font-bold">Rs. {dueAmount}</span> (Rs. 1 per day)</p>
                                            </div>
                                        )}
                                        
                                        {dueAmount === 0 && (
                                            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                                <p className="font-medium text-green-800">No due amount. Book returned on time.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions className="p-4 bg-gray-50">
                    <Button 
                        onClick={handleCloseDialog} 
                        className="text-gray-600 hover:bg-gray-200 transition-colors duration-200 rounded-lg py-2 px-4"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirmAction} 
                        variant="contained"
                        className="bg-secondary hover:bg-secondary/90 text-white transition-colors duration-200 rounded-lg py-2 px-4 shadow-md"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default StudentDetails;