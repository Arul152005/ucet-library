import React, { useState, useEffect } from 'react';
import LibraryTable from '../../component/LibraryTable';
import { booksAPI } from '../../services/api';

const LibraryInfo = ({ regNumber }) => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooksData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const books = await booksAPI.getAllBooks();
                
                // Transform the data to match the expected format
                // In a real application, this would come from actual borrowing data
                const transformedBooks = books
                    .filter(book => book.takenBy) // Only show borrowed books
                    .map((book, index) => {
                        // Calculate remaining days
                        const returnDate = new Date(book.takenDate);
                        returnDate.setDate(returnDate.getDate() + 30); // Assuming 30-day borrowing period
                        const today = new Date();
                        const remainingDays = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));
                        
                        return {
                            bookTitle: book.title,
                            bookId: book.isbn,
                            borrowedDate: book.takenDate ? new Date(book.takenDate).toLocaleDateString() : 'N/A',
                            returnDeadline: returnDate.toLocaleDateString(),
                            remainingDays: remainingDays
                        };
                    });
                
                setBorrowedBooks(transformedBooks);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchBooksData();
    }, [regNumber]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                <span className="ml-3 text-lg text-primary">Loading library information...</span>
            </div>
        );
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    }

    return (
        <section className="bg-dimWhite min-w-screen"> 
         <div className="p-6 max-w-[992px] flex justify-center align-center flex-col gap-6 m-auto">
            <h1 className="text-3xl font-bold mb-6">Library Information</h1>
            {regNumber && (
                <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg">
                    Showing library information for student with register number: <strong>{regNumber}</strong>
                </div>
            )}
            <div className="">
                <div className="p-4 border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Borrowed Books</h2>
                    {borrowedBooks.length > 0 ? (
                        <LibraryTable rows={borrowedBooks} />
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No borrowed books found for this student.
                        </div>
                    )}
                </div>
            </div>
        </div>
       </section>
    );
};

export default LibraryInfo;