// src/pages/Admin.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/layout/Navbar";
import { getUserGameState, getUserBetHistory } from "../utils/gameStorage";

const Admin = () => {
  const {
    currentUser,
    users,
    adminUpdateBalance,
    adminResetGame,
    adminClearHistory,
  } = useAuth();
  const [editValues, setEditValues] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userGameDetails, setUserGameDetails] = useState({});
  const [userHistory, setUserHistory] = useState({});

  if (!currentUser || currentUser.role !== "admin")
    return <Navigate to="/game" />;

  const handleChange = (email, value) => {
    setEditValues({ ...editValues, [email]: value });
  };

  const saveBalance = (email) => {
    const newBalance = Number(editValues[email]);
    if (!isNaN(newBalance) && newBalance >= 0) {
      adminUpdateBalance(email, newBalance);
      alert(`Balance updated for ${email}`);
    } else {
      alert("Invalid amount");
    }
  };

  const handleResetGame = (email) => {
    if (
      window.confirm(
        `Reset game for ${email}? This will clear their current game progress.`,
      )
    ) {
      adminResetGame(email);
      alert(`Game reset for ${email}`);
      setUserGameDetails((prev) => ({ ...prev, [email]: null }));
    }
  };

  const handleClearHistory = (email) => {
    if (window.confirm(`Clear betting history for ${email}?`)) {
      adminClearHistory(email);
      alert(`History cleared for ${email}`);
      setUserHistory((prev) => ({ ...prev, [email]: [] }));
    }
  };

  const toggleUserDetails = (email) => {
    if (selectedUser === email) {
      setSelectedUser(null);
    } else {
      const gameState = getUserGameState(email);
      const history = getUserBetHistory(email);
      setUserGameDetails((prev) => ({ ...prev, [email]: gameState }));
      setUserHistory((prev) => ({ ...prev, [email]: history }));
      setSelectedUser(email);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🛡️ Admin Dashboard</h1>
        </div>

        <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Balance (₹)</th>
                <th className="p-4">Total Deposited</th>
                <th className="p-4">Total Bets</th>
                <th className="p-4">Total Won</th>
                <th className="p-4">Net P/L</th>
                <th className="p-4">Actions</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const netPL = user.totalWon - user.totalBets;
                const gameState = userGameDetails[user.email];
                const matchedCount =
                  gameState?.row1?.filter((c) => c.matched).length || 0;
                const history = userHistory[user.email] || [];
                const isExpanded = selectedUser === user.email;
                const createdAt = new Date(user.createdAt).toLocaleDateString();

                return (
                  <React.Fragment key={user.email}>
                    <tr className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{user.email}</div>
                          <div className="text-xs text-gray-400">
                            Joined: {createdAt}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize">{user.role}</td>
                      <td className="p-4 text-green-400 font-mono">
                        ₹ {user.balance.toLocaleString()}
                      </td>
                      <td className="p-4 text-yellow-400 font-mono">
                        ₹ {user.totalDeposited.toLocaleString()}
                      </td>
                      <td className="p-4 text-blue-400 font-mono">
                        ₹ {user.totalBets.toLocaleString()}
                      </td>
                      <td className="p-4 text-emerald-400 font-mono">
                        ₹ {user.totalWon.toLocaleString()}
                      </td>
                      <td
                        className={`p-4 font-mono ${netPL >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        ₹ {netPL.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="number"
                              defaultValue={user.balance}
                              onChange={(e) =>
                                handleChange(user.email, e.target.value)
                              }
                              className="bg-gray-600 text-white px-2 py-1 rounded w-28 text-sm"
                              placeholder="New balance"
                            />
                            <button
                              onClick={() => saveBalance(user.email)}
                              className="bg-blue-600 px-2 py-1 rounded text-sm"
                            >
                              Set
                            </button>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleResetGame(user.email)}
                              className="bg-orange-600 px-2 py-1 rounded text-sm"
                            >
                              Reset Game
                            </button>
                            <button
                              onClick={() => handleClearHistory(user.email)}
                              className="bg-red-600 px-2 py-1 rounded text-sm"
                            >
                              Clear History
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleUserDetails(user.email)}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          {isExpanded ? "▲ Hide" : "▼ Show"}
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan="9" className="bg-gray-750 p-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-yellow-400 mb-2">
                                🎮 Current Game State
                              </h4>
                              {gameState ? (
                                <div>
                                  <p>Matched pairs: {matchedCount}/5</p>
                                  <p>
                                    Game active:{" "}
                                    {gameState.gameActive ? "Yes" : "No"}
                                  </p>
                                  <p>
                                    Last updated:{" "}
                                    {new Date(
                                      gameState.timestamp,
                                    ).toLocaleString()}
                                  </p>
                                  <details className="mt-2">
                                    <summary className="cursor-pointer text-gray-400">
                                      View card layout
                                    </summary>
                                    <pre className="text-xs mt-1 bg-black p-2 rounded overflow-x-auto">
                                      {JSON.stringify(
                                        {
                                          row1: gameState.row1,
                                          row2: gameState.row2,
                                        },
                                        null,
                                        2,
                                      )}
                                    </pre>
                                  </details>
                                </div>
                              ) : (
                                <p>No saved game data</p>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-yellow-400 mb-2">
                                📜 Betting History (last 10)
                              </h4>
                              {history.length > 0 ? (
                                <ul className="text-sm space-y-1 max-h-60 overflow-y-auto">
                                  {history
                                    .slice()
                                    .reverse()
                                    .map((entry, idx) => (
                                      <li
                                        key={idx}
                                        className="border-b border-gray-600 py-1"
                                      >
                                        <span
                                          className={
                                            entry.type === "win"
                                              ? "text-green-400"
                                              : "text-red-400"
                                          }
                                        >
                                          {entry.message}
                                        </span>
                                        <span className="text-gray-400 text-xs ml-2">
                                          {new Date(
                                            entry.timestamp,
                                          ).toLocaleString()}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              ) : (
                                <p>No betting history</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
