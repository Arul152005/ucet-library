import React, { useState, useEffect } from 'react';
import { studentsAPI } from '../../services/api';

function StudentInfo({ regNumber }) {
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // If a register number is provided, fetch that specific student
                if (regNumber) {
                    // Fetch all students and find the one with matching register number
                    // In a real application, you would have an API endpoint to fetch by register number
                    const students = await studentsAPI.getAllStudents();
                    const student = students.find(s => s.studentId === regNumber);
                    
                    if (student) {
                        setStudentData(student);
                    } else {
                        setError(`Student with register number ${regNumber} not found`);
                    }
                } else {
                    // If no register number, fetch the first student as an example
                    const students = await studentsAPI.getAllStudents();
                    if (students.length > 0) {
                        setStudentData(students[0]);
                    } else {
                        setError('No students found in the database');
                    }
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [regNumber]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                <span className="ml-3 text-lg text-primary">Loading student information...</span>
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-center text-red-500 text-lg">Error: {error}</div>;
    }

    if (!studentData) {
        return <div className="p-8 text-center text-lg">No student data available</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8 text-center">Student Information</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Personal Details</h2>
                    <div className="space-y-3">
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Name:</span>
                            <span className="font-medium">{studentData.name || 'N/A'}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="font-medium">{studentData.email || 'N/A'}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Student ID:</span>
                            <span className="font-medium">{studentData.studentId || 'N/A'}</span>
                        </p>
                    </div>
                </div>
                
                {/* Academic Details */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Academic Details</h2>
                    <div className="space-y-3">
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Course:</span>
                            <span className="font-medium">{studentData.course || 'N/A'}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Year:</span>
                            <span className="font-medium">{studentData.year || 'N/A'}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">GPA:</span>
                            <span className="font-medium">{studentData.gpa || 'N/A'}</span>
                        </p>
                    </div>
                </div>
                
                {/* Contact Details */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Contact Details</h2>
                    <div className="space-y-3">
                        <p className="flex justify-between">
                            <span className="font-medium text-gray-600">Phone:</span>
                            <span className="font-medium">{studentData.phone || 'N/A'}</span>
                        </p>
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-600 mb-1">Address:</span>
                            <span className="font-medium break-words">{studentData.address || 'N/A'}</span>
                        </div>
                    </div>
                </div>
                
                {/* Scholarship Info */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200">
                    <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Scholarship Info</h2>
                    {studentData.scholarships && studentData.scholarships.length > 0 ? (
                        <ul className="space-y-2">
                            {studentData.scholarships.map((scholarship, index) => (
                                <li key={index} className="flex justify-between">
                                    <span className="font-medium text-gray-600">{scholarship.name}:</span>
                                    <span className="font-medium">{scholarship.description}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No scholarship information available</p>
                    )}
                </div>
                
                {/* Hosteller Info */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-200 md:col-span-2">
                    <h2 className="text-2xl font-semibold text-primary mb-4 pb-2 border-b border-gray-200">Hosteller Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Hosteller:</span>
                            <span className="font-medium">{studentData.isHosteller ? 'Yes' : 'No'}</span>
                        </div>
                        {studentData.isHosteller && (
                            <>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Hostel Name:</span>
                                    <span className="font-medium">{studentData.hostelName || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Room Number:</span>
                                    <span className="font-medium">{studentData.roomNumber || 'N/A'}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentInfo;