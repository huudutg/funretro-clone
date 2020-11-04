import React from 'react';
import DashBoardNavbar from './DashBoardNavbar'
import MainBoard from './MainBoard/MainBoard';
import OptionTab from './OptionTab';
const Dashboard = () => {
    return (
        <div className='dashboard'>
            <DashBoardNavbar />
            <OptionTab />
            <MainBoard />
        </div>
    );
}

export default Dashboard;
