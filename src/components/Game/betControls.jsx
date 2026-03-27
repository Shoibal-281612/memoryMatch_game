import React from 'react';

const BetControls = ({ betAmount, setBetAmount }) => {
  return (
    <div className="bg-gray-800/70 p-5 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-3">🎲 Bet Settings</h2>
      <div className="flex gap-3 items-center">
        <span className="text-yellow-300">₹</span>
        <input
          type="number"
          min="10"
          max="5000"
          value={betAmount}
          onChange={(e) => setBetAmount(Math.min(5000, Math.max(10, Number(e.target.value))))}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg w-32"
        />
        <span className="text-sm text-gray-400">max ₹5000</span>
      </div>
    </div>
  );
};

export default BetControls;