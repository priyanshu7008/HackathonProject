import React, { useState } from 'react';
import { register_campaign } from '../utils/actor';

const RegisterCampaign = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goal, setGoal] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register_campaign(title, description, parseFloat(goal));
        alert('Campaign Registered!');
    };

    return (
        <div className="container">
            <h2>Register Campaign</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Funding Goal (ICP)" value={goal} onChange={(e) => setGoal(e.target.value)} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegisterCampaign;
