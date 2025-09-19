import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState('');
  const regNumberInputRef = useRef(null);

  const navigate = useNavigate();

  // Focus on the register number input field when component mounts
  useEffect(() => {
    if (regNumberInputRef.current) {
      regNumberInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      setRegNumber(value);
    }
    
    // Clear previous error when input changes
    setError('');
  };

  const handleViewStudentDetails = () => {
    if (!regNumber.trim()) {
      setError('Please enter a register number');
      // Focus on the input field when there's an error
      if (regNumberInputRef.current) {
        regNumberInputRef.current.focus();
      }
      return;
    }
    
    // Check if register number is exactly 12 digits
    if (regNumber.length !== 12) {
      setError('Register number must be exactly 12 digits');
      // Focus on the input field when there's an error
      if (regNumberInputRef.current) {
        regNumberInputRef.current.focus();
      }
      return;
    }
    
    // Navigate to student details page with the register number as state
    navigate('/studentdetails', { state: { regNumber } });
  };

  const handleReset = () => {
    setRegNumber('');
    setError('');
    // Focus on the input field after reset
    if (regNumberInputRef.current) {
      regNumberInputRef.current.focus();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleViewStudentDetails();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-102px)] p-6 bg-dimWhite">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">Admin Dashboard</h1>
        
        <div className="mb-8">
          <label htmlFor="regNumber" className="block text-lg font-medium text-primary mb-2">
            Enter Register Number (12 digits)
          </label>
          <input
            ref={regNumberInputRef}
            className="w-full rounded-lg border-2 border-[#D8DADC] p-3 focus:border-secondary focus:outline-none transition-colors duration-200"
            type="text"
            name="regNumber"
            id="regNumber"
            placeholder="Enter 12-digit Register Number"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            value={regNumber}
            maxLength="12"
          />
          <div className="text-sm text-gray-500 mt-1">
            {regNumber.length}/12 digits
          </div>
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