// Verification.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Verification() {
    const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { userId } = location.state;

    const handleVerify = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify', { userId, verificationCode });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Verification</h1>
            <input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
}

export default Verification;
