import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Game from './pages/Game';
import Admin from './pages/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/game" element={<Game />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/game" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;