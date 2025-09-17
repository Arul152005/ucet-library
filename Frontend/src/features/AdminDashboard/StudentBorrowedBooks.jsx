import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { studentsAPI, booksAPI } from '../../services/api';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';

const StudentBorrowedBooks = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudent = async () => {
        try {
            setLoading(true);
            const data = await studentsAPI.getStudentById(id);
            setStudent(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]);

    const handleReturnBook = async (bookId) => {
        try {
            await booksAPI.returnBook(bookId);
            fetchStudent(); // Refresh student data
        } catch (err) {
            setError(err.message);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                <span className="ml-3 text-lg text-primary">Loading borrowed books...</span>
            </div>
        );
    }
    if (error) return <Alert severity="error" className="m-6">{error}</Alert>;
    if (!student) return <div className="p-6">Student not found</div>;

    return (
        <div className="p-6 max-w-[1200px] m-auto">
            <h1 className="text-3xl font-bold mb-6">Borrowed Books - {student.name}</h1>
            
            {student.borrowedBooks && student.borrowedBooks.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Book Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Borrowed Date</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {student.borrowedBooks.map((borrowedBook) => (
                                <TableRow key={borrowedBook._id}>
                                    <TableCell>{borrowedBook.bookId.title}</TableCell>
                                    <TableCell>{borrowedBook.bookId.author}</TableCell>
                                    <TableCell>{formatDate(borrowedBook.borrowedDate)}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            color="secondary" 
                                            size="small" 
                                            onClick={() => handleReturnBook(borrowedBook.bookId._id)}
                                        >
                                            Return
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <div className="text-center py-8">
                    <p>No borrowed books found for this student.</p>
                </div>
            )}
        </div>
    );
};

export default StudentBorrowedBooks;