import Webcam from 'react-webcam';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';



function AdminDashboard() {
  const [regNumber, setRegNumber] = useState('');

  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setRegNumber(e.target.value);
  };

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log('Submitted Reg Number:', regNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center main-full">
      <div className="mb-5 drop-shadow-md">
        <Webcam width={"512px"}/>
      </div>
      <div className="mb-5">
      </div>
      <div className="mb-5">
      <input
                  className="rounded-md border-[2px] border-[#D8DADC] p-2 focus:border-primary focus:outline-none"
                  type="Number"
                  name="rollno"
                  id="number"
                  placeholder="Enter Register Number"
                  onChange={handleInputChange}
                  required
                  value={regNumber}
                />
      </div>
      <div>
      <Link to="/studentdetails">
       <Button variant="contained">Submit</Button>
      </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;