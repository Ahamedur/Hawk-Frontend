// Verification.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Verification() {
    const [verificationCode, setVerificationCode] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, email } = location.state;

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^a-z0-9]/gi, ''); // Allow only alphanumeric characters
        if (!value) return; // Ignore empty or invalid input
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        // Move to the next input field if the current one is filled
        if (index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerify = async () => {
        const code = verificationCode.join('');
        try {
            const response = await axios.post('http://localhost:5000/api/verify', { userId, verificationCode: code });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Verification Error:', error);
        }
    };

    const inputStyle = {
        width: '40px',
        height: '40px',
        margin: '5px',
        fontSize: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    };

    return (
       <div className="verification-container">
            <div className="form-container">
            <h1>Verification</h1>
            
               <h1>Let's verify your email</h1>
                <p>We already sent a code to {email}, please check your inbox and insert the code in the form below to verify your email.
            </p>
            <div className="verification-inputs">
                    {verificationCode.map((data, index) => {
                       return ( 
                        <input
                            key={index}
                            //id={`code-${index}`}
                            type="text"
                            maxLength="1"
                            value={data}
                            style={inputStyle}
                            ref={el => inputRefs.current[index] = el}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                        />
                    );
                })}
            </div>
            <button onClick={handleVerify}>Verify</button>
        </div>
       </div>
    );
}

export default Verification;
