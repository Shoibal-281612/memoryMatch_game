// src/pages/Game.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';      // <-- ADD THIS
import { useAuth } from '../context/authContext';
import { useGame } from '../hooks/useGame';
import BetControls from '../components/Game/betControls';
import GameBoard from '../components/Game/gameBoard';
import WalletPanel from '../components/Wallet/walletPannel';
import Navbar from '../components/layout/navbar';

const Game = () => {
  const { currentUser, deduct, addWinnings, addMoney } = useAuth();
  const {
    row1,
    row2,
    selectedRow1Idx,
    selectedRow2Idx,
    betAmount,
    setBetAmount,
    gameActive,
    gameMessage,
    resetGame,
    handleRow1Click,
    handleRow2Click
  } = useGame(100, deduct, addWinnings);

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8 bg-gray-800/60 p-4 rounded-2xl">
          <div className="text-2xl font-bold">💰 Balance: ₹{currentUser.balance}</div>
          <button onClick={resetGame} className="bg-blue-600 px-4 py-2 rounded-xl">New Game</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <WalletPanel onAddMoney={addMoney} />
          <BetControls betAmount={betAmount} setBetAmount={setBetAmount} />
        </div>
        <GameBoard
          row1={row1}
          row2={row2}
          selectedRow1Idx={selectedRow1Idx}
          selectedRow2Idx={selectedRow2Idx}
          onRow1Click={handleRow1Click}
          onRow2Click={handleRow2Click}
          gameMessage={gameMessage}
        />
      </div>
    </div>
  );
};

export default Game;