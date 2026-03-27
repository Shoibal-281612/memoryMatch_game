// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUsers, saveUsers, getSession, setSession } from '../utils/storage';
import { clearUserGameState, clearUserBetHistory } from '../utils/gameStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = getUsers();
    setUsers(storedUsers);
    const session = getSession();
    if (session?.email) {
      const user = storedUsers.find(u => u.email === session.email);
      if (user) setCurrentUser({ ...user });
    }
    setLoading(false);
  }, []);

  const updateUserInStorage = (updatedUser) => {
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    if (currentUser?.email === updatedUser.email) {
      setCurrentUser({ ...updatedUser });
    }
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser({ ...user });
      setSession(email);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (email, password) => {
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    const newUser = {
      email,
      password,
      balance: 1000,
      role: 'user',
      totalDeposited: 0,
      totalBets: 0,
      totalWon: 0,
      createdAt: new Date().toISOString()
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
    setCurrentUser({ ...newUser });
    setSession(email);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setSession(null);
  };

  const addMoney = (amount) => {
    if (!currentUser) return false;
    const newBalance = currentUser.balance + amount;
    const newTotalDeposited = currentUser.totalDeposited + amount;
    const updated = { 
      ...currentUser, 
      balance: newBalance,
      totalDeposited: newTotalDeposited
    };
    updateUserInStorage(updated);
    return true;
  };

  const deduct = (amount) => {
    if (!currentUser || currentUser.balance < amount) return false;
    const newBalance = currentUser.balance - amount;
    const newTotalBets = currentUser.totalBets + amount;
    const updated = { 
      ...currentUser, 
      balance: newBalance,
      totalBets: newTotalBets
    };
    updateUserInStorage(updated);
    return true;
  };

  const addWinnings = (amount) => {
    if (!currentUser) return false;
    const newBalance = currentUser.balance + amount;
    const newTotalWon = currentUser.totalWon + amount;
    const updated = { 
      ...currentUser, 
      balance: newBalance,
      totalWon: newTotalWon
    };
    updateUserInStorage(updated);
    return true;
  };

  const adminUpdateBalance = (email, newBalance) => {
    const targetUser = users.find(u => u.email === email);
    if (!targetUser) return false;
    const updatedUser = { ...targetUser, balance: Math.max(0, newBalance) };
    updateUserInStorage(updatedUser);
    return true;
  };

  const adminResetGame = (email) => {
    clearUserGameState(email);
    // Optionally also clear betting history? We'll keep history separate.
  };

  const adminClearHistory = (email) => {
    clearUserBetHistory(email);
  };

  const value = {
    currentUser,
    users,
    login,
    signup,
    logout,
    addMoney,
    deduct,
    addWinnings,
    adminUpdateBalance,
    adminResetGame,
    adminClearHistory,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);