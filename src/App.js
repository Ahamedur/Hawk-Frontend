import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import UserInfo from './components/UserInfo';
import Verification from './components/Verification'; // New import
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/verification" element={<Verification />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
