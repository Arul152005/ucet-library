import React, { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import StudentInfo from './StudentInfo';
import LibraryInfo from './LibraryInfo';

const StudentDetails = () => {
    const [activeTab, setActiveTab] = useState('stdinfo');

    const handleTabClick = (tab) => {
        if (tab !== activeTab)
            setActiveTab(tab);
    };

    return (
        <div className="bg-dimWhite main-full  min-w-screen">
            <div className="flex justify-center align-center pt-10"> 
                <ToggleButtonGroup
                    color="primary"
                    value={activeTab}
                    exclusive
                    onChange={(event, tab) => handleTabClick(tab)}
                    aria-label="Platform"
                    >
                    <ToggleButton value="stdinfo">Student Info</ToggleButton>
                    <ToggleButton value="libinfo">Library Info</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="content">
                {activeTab === 'stdinfo' && <StudentInfo/>}
                {activeTab === 'libinfo' && <LibraryInfo/>}
            </div>
        </div>
    );
};

export default StudentDetails;