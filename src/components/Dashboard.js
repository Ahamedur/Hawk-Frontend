import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import '../App.css'; // Ensure this path is correct

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      try {
        const decoded = jwt_decode(token);
        console.log('Decoded token:', decoded);
        setUsername(decoded.username);
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/');
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="background-image-container">
    <div className="form-container">
      <h1>Welcome, {username}</h1>
      <p>If you are not {username}, please <button onClick={handleLogout}>logout</button> immediately.</p>
    </div>
   </div>
  );
}

export default Dashboard;
