import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RegisterCampaign from './pages/RegisterCampaign';
import FundCampaign from './pages/FundCampaign';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterCampaign />} />
            <Route path="/fund" element={<FundCampaign />} />
        </Routes>
    );
};

export default App;
