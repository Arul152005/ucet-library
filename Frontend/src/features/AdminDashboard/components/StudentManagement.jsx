import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { studentsAPI } from '../../../services/api';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: ''
    });

    // Fetch students from the backend
    const fetchStudents = async () => {
        try {
            setLoading(true);
            const data = await studentsAPI.getAllStudents();
            setStudents(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Load students when component mounts
    useEffect(() => {
        fetchStudents();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentStudent) {
                // Update existing student
                await studentsAPI.updateStudent(currentStudent._id, formData);
            } else {
                // Create new student
                await studentsAPI.createStudent(formData);
            }
            // Reset form and close dialog
            setFormData({
                name: '',
                email: '',
                studentId: ''
            });
            setCurrentStudent(null);
            setOpenDialog(false);
            // Refresh students list
            fetchStudents();
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle edit student
    const handleEditStudent = (student) => {
        setCurrentStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            studentId: student.studentId
        });
        setOpenDialog(true);
    };

    // Handle delete student
    const handleDeleteStudent = async (id) => {
        try {
            await studentsAPI.deleteStudent(id);
            fetchStudents();
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle add new student
    const handleAddStudent = () => {
        setCurrentStudent(null);
        setFormData({
            name: '',
            email: '',
            studentId: ''
        });
        setOpenDialog(true);
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Count borrowed books
    const getBorrowedBooksCount = (borrowedBooks) => {
        return borrowedBooks ? borrowedBooks.length : 0;
    };

    return (
        <div className="p-6 max-w-[1200px] m-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Student Management</h1>
                <Button variant="contained" onClick={handleAddStudent}>
                    Add New Student
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
                    <span className="ml-3 text-lg text-primary">Loading students...</span>
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Student ID</TableCell>
                                <TableCell>Borrowed Books</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{getBorrowedBooksCount(student.borrowedBooks)}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            component={Link}
                                            to={`/students/${student._id}/borrowed-books`}
                                            style={{ marginRight: 8 }}
                                        >
                                            View
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            onClick={() => handleEditStudent(student)}
                                            style={{ marginRight: 8 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="error" 
                                            size="small" 
                                            onClick={() => handleDeleteStudent(student._id)}
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

            {/* Student Form Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {currentStudent ? 'Edit Student' : 'Add New Student'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <TextField
                                label="Student ID"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleInputChange}
                                required
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            {currentStudent ? 'Update' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default StudentManagement;