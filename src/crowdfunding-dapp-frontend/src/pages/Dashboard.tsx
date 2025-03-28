import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Welcome to the Dashboard</h1>
            <button onClick={() => navigate('/register')}>Register Campaign</button>
            <button onClick={() => navigate('/fund')}>Fund Campaign</button>
        </div>
    );
};

export default Dashboard;
