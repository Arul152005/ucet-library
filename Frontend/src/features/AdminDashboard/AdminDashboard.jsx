import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRegNumber(e.target.value);
    // Clear previous error when input changes
    setError('');
  };

  const handleViewStudentDetails = () => {
    if (!regNumber.trim()) {
      setError('Please enter a register number');
      return;
    }
    
    // Navigate to student details page with the register number as state
    navigate('/studentdetails', { state: { regNumber } });
  };

  const handleReset = () => {
    setRegNumber('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-102px)] p-6 bg-dimWhite">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Admin Dashboard</h1>
        
        <div className="mb-8">
          <label htmlFor="regNumber" className="block text-lg font-medium text-primary mb-2">
            Enter Register Number
          </label>
          <input
            className="w-full rounded-lg border-2 border-[#D8DADC] p-3 focus:border-secondary focus:outline-none transition-colors duration-200"
            type="text"
            name="regNumber"
            id="regNumber"
            placeholder="Enter Register Number"
            onChange={handleInputChange}
            value={regNumber}
          />
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Button 
            variant="contained" 
            onClick={handleViewStudentDetails}
            className="w-full py-3 px-6 bg-secondary hover:bg-secondary/90 transition-colors duration-200"
          >
            View Student Details
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleReset}
            className="w-full py-3 px-6 border-secondary text-secondary hover:bg-secondary/10 transition-colors duration-200"
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Management Options</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="contained" 
            onClick={() => navigate('/books')}
            className="w-full py-3 px-6 bg-secondary hover:bg-secondary/90 transition-colors duration-200 mb-4 sm:mb-0"
          >
            Manage Books
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/students')}
            className="w-full py-3 px-6 bg-secondary hover:bg-secondary/90 transition-colors duration-200"
          >
            Manage Students
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;