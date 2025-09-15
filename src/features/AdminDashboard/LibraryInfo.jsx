import React from 'react';
import LibraryTable from '../../component/LibraryTable';

const LibraryInfo = () => {
    // Dummy data for demonstration
    const borrowedBooks = [
        {
          bookTitle: "The Great Gatsby",
          bookId: "B001",
          borrowedDate: "2025-01-15",
          returnDeadline: "2025-02-15",
          remainingDays: 13
        },
        {
          bookTitle: "1984",
          bookId: "B002",
          borrowedDate: "2025-01-20",
          returnDeadline: "2025-02-20",
          remainingDays: 18
        },
        {
          bookTitle: "To Kill a Mockingbird",
          bookId: "B003",
          borrowedDate: "2025-01-25",
          returnDeadline: "2025-02-25",
          remainingDays: 23
        },
        {
          bookTitle: "Pride and Prejudice",
          bookId: "B004",
          borrowedDate: "2025-01-30",
          returnDeadline: "2025-03-01",
          remainingDays: 27
        },
        {
          bookTitle: "The Catcher in the Rye",
          bookId: "B005",
          borrowedDate: "2025-02-01",
          returnDeadline: "2025-03-03",
          remainingDays: 29
        }
      ];
      

    return (

        <section className="bg-dimWhite  min-w-screen"> 
         <div className="p-6 max-w-[992px] flex justify-center align-center flex-col gap-6 m-auto">
            <h1 className="text-3xl font-bold mb-6">Library Information</h1>
            <div className="">
                <div className="p-4 borderrounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Borrowed Books</h2>
                    <LibraryTable rows={borrowedBooks} />
                </div>
            </div>
        </div>
       </section>
    );
};

export default LibraryInfo;