import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import MinimalNavbar from "../components/layout/miniNavbar";

const Login = () => {
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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-orange-800">
      <MinimalNavbar />
      <div className="flex items-center justify-center p-4 pt-12">
        <div className="max-w-md w-full bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-orange-500/30">
          <div className="text-center mb-6">
            <div className="inline-block p-2 bg-orange-500 rounded-full mb-3">
              <span className="text-2xl">🎮</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-300 mt-2">Login to continue your journey</p>
          </div>
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
    </div>
  );
};

export default Login;
