import React from 'react';

const GameCard = ({ card, isSelected, onClick }) => {
  const baseClasses = "card cursor-pointer rounded-xl h-28 flex items-center justify-center text-3xl font-bold shadow-lg transition-all";
  const matchedClasses = card.matched ? "bg-green-800/80 cursor-default matched" : "bg-gradient-to-br from-indigo-700 to-purple-800";
  const selectedClasses = isSelected ? "ring-4 ring-yellow-400 transform scale-95" : "";

  return (
    <div
      className={`${baseClasses} ${matchedClasses} ${selectedClasses}`}
      onClick={onClick}
    >
      {card.matched ? '✓' : card.value}
    </div>
  );
};

export default GameCard;