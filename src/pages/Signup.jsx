// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();      // <-- use signup, not Signup
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(email, password);   // <-- call signup
    if (result.success) {
      navigate('/game');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
        {error && <div className="bg-red-900/50 p-3 rounded mb-4 text-red-200">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 rounded bg-gray-700 text-white"
            required
          />
          <button type="submit" className="w-full bg-emerald-600 p-3 rounded font-bold">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account? <Link to="/login" className="text-yellow-400">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;