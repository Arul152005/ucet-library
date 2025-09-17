function StudentInfo() {
    return (
       <section className="bg-dimWhite min-h-screen min-w-screen"> 
         <div className="p-6 max-w-[992px] flex justify-center align-center flex-col gap-6 m-auto">
            <h1 className="text-3xl font-bold mb-6">Student Information</h1>
            <div className="space-y-6">
                <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
                    <p><strong>Name:</strong> John Doe</p>
                    <p><strong>Age:</strong> 20</p>
                    <p><strong>Gender:</strong> Male</p>
                    <p><strong>Email:</strong> john.doe@example.com</p>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Academic Details</h2>
                    <p><strong>Course:</strong> Computer Science</p>
                    <p><strong>Year:</strong> 3rd Year</p>
                    <p><strong>GPA:</strong> 3.8</p>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
                    <p><strong>Phone:</strong> (123) 456-7890</p>
                    <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Scholarship Info</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>Scholarship A:</strong> Full Tuition</li>
                        <li><strong>Scholarship B:</strong> $2000 per semester</li>
                        <li><strong>Scholarship C:</strong> $1000 per year</li>
                    </ul>
                </div>
                <div className="p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">Hosteller Info</h2>
                    <p><strong>Hosteller:</strong> Yes</p>
                    <p><strong>Hostel Name:</strong> ABC Hostel</p>
                    <p><strong>Room Number:</strong> 101</p>
                </div>
            </div>
        </div>
       </section>
    );
}

export default StudentInfo;