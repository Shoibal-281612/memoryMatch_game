// src/components/layout/MinimalNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MinimalNavbar = () => {
  return (
    <nav className="bg-black border-b-4 border-orange-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xl group-hover:scale-110 transition-transform">
              🎮
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              <span className="text-orange-400">MEMORY</span> MATCH
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MinimalNavbar;