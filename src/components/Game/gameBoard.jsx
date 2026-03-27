import React from 'react';
import GameCard from './gameCard';

const GameBoard = ({ row1, row2, selectedRow1Idx, selectedRow2Idx, onRow1Click, onRow2Click, gameMessage }) => {
  return (
    <div className="bg-black/30 rounded-3xl p-6 backdrop-blur-sm">
      {gameMessage && (
        <div className="text-center mb-4 text-lg font-medium bg-black/50 px-4 py-2 rounded-full inline-block w-full">
          {gameMessage}
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-center text-sm uppercase tracking-wider text-gray-400 mb-3">🔽 TOP ROW</h3>
        <div className="grid grid-cols-5 gap-4">
          {row1.map((card, idx) => (
            <GameCard
              key={card.id}
              card={card}
              isSelected={selectedRow1Idx === idx && !card.matched}
              onClick={() => onRow1Click(idx)}
            />
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-center text-sm uppercase tracking-wider text-gray-400 mb-3">🔼 BOTTOM ROW</h3>
        <div className="grid grid-cols-5 gap-4">
          {row2.map((card, idx) => (
            <GameCard
              key={card.id}
              card={card}
              isSelected={selectedRow2Idx === idx && !card.matched}
              onClick={() => onRow2Click(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;