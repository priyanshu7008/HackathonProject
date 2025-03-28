import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithII } from '../utils/actor';

const Home = () => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        const isAuthenticated = await loginWithII();
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="container">
            <h1>Welcome to ICP Crowdfunding</h1>
            <button onClick={handleLogin}>Login with Internet Identity</button>
        </div>
    );
};

export default Home;
