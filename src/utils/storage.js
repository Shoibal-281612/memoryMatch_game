
const USERS_KEY = 'memory_match_users';
const SESSION_KEY = 'memory_match_session';

export const getUsers = () => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    const defaultUsers = [
      { 
        email: 'player1@demo.com', 
        password: 'pass123', 
        balance: 2500, 
        role: 'user',
        totalDeposited: 0,
        totalBets: 0,
        totalWon: 0,
        createdAt: new Date().toISOString()
      },
      { 
        email: 'admin@admin.com', 
        password: 'admin123', 
        balance: 9999, 
        role: 'admin',
        totalDeposited: 0,
        totalBets: 0,
        totalWon: 0,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  
  const users = JSON.parse(raw);
  // Ensure all users have the new fields
  return users.map(user => ({
    ...user,
    totalDeposited: user.totalDeposited !== undefined ? user.totalDeposited : 0,
    totalBets: user.totalBets !== undefined ? user.totalBets : 0,
    totalWon: user.totalWon !== undefined ? user.totalWon : 0,
    createdAt: user.createdAt || new Date().toISOString()
  }));
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

export const setSession = (email) => {
  if (email) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};