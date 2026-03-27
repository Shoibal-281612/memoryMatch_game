import React, { useState } from "react";

const WalletPanel = ({ onAddMoney }) => {
  const [amount, setAmount] = useState(500);

  const handleAdd = () => {
    if (amount > 0 && amount <= 100000) {
      onAddMoney(amount);
      setAmount(500);
    } else {
      alert("Enter amount between 1 and 100000");
    }
  };

  return (
    <div className="bg-gray-800/70 p-5 rounded-2xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-3">💳 Wallet Manager</h2>
      <div className="flex gap-3">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg w-36"
        />
        <button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg"
        >
          Add Money
        </button>
      </div>
    </div>
  );
};

export default WalletPanel;
