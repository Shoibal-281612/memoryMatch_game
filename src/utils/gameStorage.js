// src/utils/gameStorage.js
const GAME_STATE_PREFIX = 'memory_match_game_';

export const getUserGameState = (email) => {
  const key = `${GAME_STATE_PREFIX}${email}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveUserGameState = (email, gameState) => {
  const key = `${GAME_STATE_PREFIX}${email}`;
  localStorage.setItem(key, JSON.stringify(gameState));
};

export const clearUserGameState = (email) => {
  const key = `${GAME_STATE_PREFIX}${email}`;
  localStorage.removeItem(key);
};
// src/utils/gameStorage.js (continued)
const BET_HISTORY_PREFIX = 'memory_match_bet_history_';

export const getUserBetHistory = (email, limit = 10) => {
  const key = `${BET_HISTORY_PREFIX}${email}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data).slice(-limit) : [];
};

export const addBetHistoryEntry = (email, entry) => {
  const key = `${BET_HISTORY_PREFIX}${email}`;
  const history = getUserBetHistory(email, 100); // get all up to 100
  history.push(entry);
  // keep only last 50 entries to avoid bloating
  const trimmed = history.slice(-50);
  localStorage.setItem(key, JSON.stringify(trimmed));
};

export const clearUserBetHistory = (email) => {
  const key = `${BET_HISTORY_PREFIX}${email}`;
  localStorage.removeItem(key);
};