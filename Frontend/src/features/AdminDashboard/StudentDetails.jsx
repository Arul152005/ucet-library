import React, { useState, useEffect } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
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
    const location = useLocation();
    const navigate = useNavigate();

    // Get the register number from location state if passed
    useEffect(() => {
        if (location.state && location.state.regNumber) {
            setRegNumber(location.state.regNumber);
        }
    }, [location.state]);

    const handleTabClick = (tab) => {
        if (tab !== activeTab)
            setActiveTab(tab);
    };

    const handleBorrowBook = async () => {
        if (!isbn.trim()) {
            setBorrowError('Please enter a book ISBN');
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
                return;
            }
            
            if (!book.available) {
                setBorrowError('This book is not available for borrowing');
                setIsBorrowing(false);
                return;
            }
            
            // Borrow the book (update book record)
            await booksAPI.borrowBook(book._id, regNumber);
            
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
                    bookId: book._id,
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

    const handleReturnBook = async () => {
        if (!isbn.trim()) {
            setReturnError('Please enter a book ISBN');
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
                return;
            }
            
            if (book.available) {
                setReturnError('This book is already available and not borrowed');
                setIsReturning(false);
                return;
            }
            
            // Return the book (update book record)
            await booksAPI.returnBook(book._id);
            
            // Also update the student record to remove this book from their borrowed books
            // First, find the student by register number
            const students = await studentsAPI.getAllStudents();
            const student = students.find(s => s.studentId === regNumber);
            
            if (student) {
                // Remove the returned book from the student's record
                await studentsAPI.removeBorrowedBook(student._id, book._id);
            }
            
            setReturnMessage('Book returned successfully!');
            setIsbn(''); // Clear the ISBN field
        } catch (err) {
            setReturnError(err.message || 'Failed to return book');
        } finally {
            setIsReturning(false);
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
                                fullWidth
                                label="Book ISBN"
                                variant="outlined"
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)}
                                placeholder="Enter book ISBN"
                                disabled={isBorrowing || isReturning}
                            />
                        </div>
                        <div className="w-full sm:w-auto flex gap-2">
                            <Button 
                                variant="contained" 
                                onClick={handleBorrowBook}
                                disabled={isBorrowing || isReturning}
                                className="w-full bg-secondary hover:bg-secondary/90"
                            >
                                {isBorrowing ? 'Borrowing...' : 'Borrow Book'}
                            </Button>
                            <Button 
                                variant="outlined" 
                                onClick={handleReturnBook}
                                disabled={isBorrowing || isReturning}
                                className="w-full border-secondary text-secondary hover:bg-secondary/10"
                            >
                                {isReturning ? 'Returning...' : 'Return Book'}
                            </Button>
                        </div>
                    </div>
                    
                    {borrowMessage && (
                        <Alert severity="success" className="mt-4">
                            {borrowMessage}
                        </Alert>
                    )}
                    
                    {borrowError && (
                        <Alert severity="error" className="mt-4">
                            {borrowError}
                        </Alert>
                    )}
                    
                    {returnMessage && (
                        <Alert severity="success" className="mt-4">
                            {returnMessage}
                        </Alert>
                    )}
                    
                    {returnError && (
                        <Alert severity="error" className="mt-4">
                            {returnError}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;