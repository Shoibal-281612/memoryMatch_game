import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate("/game");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-orange-800 flex flex-col">
      <div className="grow container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-orange-500 rounded-full mb-4">
            <span className="text-4xl">🎮</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <span className="text-orange-400">MEMORY</span> MATCH
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Test your memory, place bets, and win big! Match the cards, earn
            rewards, and climb the leaderboard.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-xl font-semibold text-white">
              Memory Challenge
            </h3>
            <p className="text-gray-300">
              Match 5 pairs of numbers from two rows
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-xl font-semibold text-white">Bet & Win</h3>
            <p className="text-gray-300">
              Place bets up to ₹5000, double your money on match
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:scale-105 transition">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-xl font-semibold text-white">Anti‑Cheat</h3>
            <p className="text-gray-300">
              Cards shuffle dynamically after every move
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-500/30">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Welcome Back
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Login to continue your journey
          </p>
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-orange-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-[1.02]"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-400 mt-6">
            New to Memory Match?{" "}
            <Link
              to="/signup"
              className="text-orange-400 hover:text-orange-300 font-semibold"
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <footer className="text-center py-6 border-t border-orange-500/30 text-gray-400 text-sm">
        developed by Soibal Deo
      </footer>
    </div>
  );
};

export default Home;
