import { useState, useEffect, useCallback } from "react";
import {
  generateUniqueNumbers,
  createRow,
  shuffleUnmatched,
  shuffleArray,
} from "../utils/gameUtils";

export const useGame = (initialBet = 100, onDeduct, onWin) => {
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [selectedRow1Idx, setSelectedRow1Idx] = useState(null);
  const [selectedRow2Idx, setSelectedRow2Idx] = useState(null);
  const [betAmount, setBetAmount] = useState(initialBet);
  const [gameActive, setGameActive] = useState(true);
  const [gameMessage, setGameMessage] = useState("");

  const resetGame = useCallback(() => {
    const numbers = generateUniqueNumbers(5, 1, 30);
    const row1Numbers = [...numbers];
    const row2Numbers = shuffleArray([...numbers]);
    setRow1(createRow(row1Numbers, "r1"));
    setRow2(createRow(row2Numbers, "r2"));
    setSelectedRow1Idx(null);
    setSelectedRow2Idx(null);
    setGameActive(true);
    setGameMessage("");
  }, []);

  // Timer: shuffle every 3 seconds
  useEffect(() => {
    if (!gameActive || row1.length === 0) return;
    const interval = setInterval(() => {
      setRow1((prev) => shuffleUnmatched(prev));
      setRow2((prev) => shuffleUnmatched(prev));
      setSelectedRow1Idx(null);
      setSelectedRow2Idx(null);
    }, 3000);
    return () => clearInterval(interval);
  }, [gameActive, row1.length]);

  // Process match when both cards selected
  useEffect(() => {
    if (selectedRow1Idx !== null && selectedRow2Idx !== null && gameActive) {
      const card1 = row1[selectedRow1Idx];
      const card2 = row2[selectedRow2Idx];
      if (card1.matched || card2.matched) {
        setSelectedRow1Idx(null);
        setSelectedRow2Idx(null);
        return;
      }

      const bet = Math.min(betAmount, 5000);
      if (bet <= 0) {
        setGameMessage("Invalid bet amount");
        setSelectedRow1Idx(null);
        setSelectedRow2Idx(null);
        return;
      }

      const deductSuccess = onDeduct(bet);
      if (!deductSuccess) {
        setGameMessage(`Insufficient balance! Need ₹${bet}`);
        setSelectedRow1Idx(null);
        setSelectedRow2Idx(null);
        return;
      }

      const isMatch = card1.value === card2.value;
      if (isMatch) {
        const winnings = bet * 2;
        onWin(winnings);
        setGameMessage(`🎉 MATCH! You won ₹${winnings}!`);

        // Mark both cards as matched
        const newRow1 = [...row1];
        const newRow2 = [...row2];
        newRow1[selectedRow1Idx] = {
          ...newRow1[selectedRow1Idx],
          matched: true,
        };
        newRow2[selectedRow2Idx] = {
          ...newRow2[selectedRow2Idx],
          matched: true,
        };
        setRow1(newRow1);
        setRow2(newRow2);

        // Check game completion
        const allMatched =
          newRow1.every((c) => c.matched) && newRow2.every((c) => c.matched);
        if (allMatched) {
          setGameMessage((prev) => prev + " 🏆 ALL PAIRS MATCHED! 🏆");
          setGameActive(false);
        } else {
          // Shuffle unmatched cards after a short delay
          setTimeout(() => {
            setRow1((prev) => shuffleUnmatched(prev));
            setRow2((prev) => shuffleUnmatched(prev));
          }, 100);
        }
      } else {
        setGameMessage(`❌ No match! You lost ₹${bet}.`);
        // Shuffle immediately after loss
        setRow1((prev) => shuffleUnmatched(prev));
        setRow2((prev) => shuffleUnmatched(prev));
      }

      setSelectedRow1Idx(null);
      setSelectedRow2Idx(null);
    }
  }, [
    selectedRow1Idx,
    selectedRow2Idx,
    row1,
    row2,
    gameActive,
    betAmount,
    onDeduct,
    onWin,
  ]);

  const handleRow1Click = (idx) => {
    if (!gameActive || row1[idx].matched) {
      setGameMessage(
        row1[idx].matched
          ? "Card already matched!"
          : "Game finished! Reset to play.",
      );
      return;
    }
    setSelectedRow1Idx(idx);
    setGameMessage("");
  };

  const handleRow2Click = (idx) => {
    if (!gameActive || row2[idx].matched) {
      setGameMessage(
        row2[idx].matched
          ? "Card already matched!"
          : "Game finished! Reset to play.",
      );
      return;
    }
    setSelectedRow2Idx(idx);
    setGameMessage("");
  };

  return {
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
    handleRow2Click,
  };
};
