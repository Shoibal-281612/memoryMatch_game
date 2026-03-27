Memory Match Game 🎮
A full‑featured memory‑matching game built with React + Vite.
Users can sign up, deposit money, place bets, and try to match cards to win rewards.
Includes an admin panel to manage users and monitor game activity.

✨ Features
🔐 Authentication – Login / Signup with localStorage persistence

💰 Wallet System – Add money, deduct bets, add winnings

🃏 Memory Matching – Two rows with 5 cards each, same numbers shuffled

🔀 Anti‑Cheat – Dynamic shuffling after every move + timer shuffle

🎲 Betting – Bet up to ₹5000 per move, win double if match

👑 Admin Panel – View all users, edit balances, reset games, clear history

📊 User Analytics – Track total deposited, total bets, total winnings, net P/L

🧠 Game Persistence – Game state saved per user in localStorage

⏱️ Timer Shuffle – Cards reshuffle every 3 seconds (except matched)

🎨 Modern UI – Black + orange theme with Tailwind CSS

🛠️ Tech Stack
React 18 – Frontend library

Vite – Build tool & dev server

React Router DOM – Client‑side routing

Tailwind CSS – Styling

localStorage – Data persistence (no backend)

📁 Project Structure
text
memory-match-game/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, icons
│   ├── components/
│   │   ├── game/            # GameBoard, GameCard, BetControls
│   │   ├── layout/          # Navbar
│   │   └── wallet/          # WalletPanel
│   ├── context/             # AuthContext (global user state)
│   ├── hooks/               # useGame, useLocalStorage
│   ├── pages/               # Login, Signup, Game, Admin
│   ├── utils/               # storage, gameStorage, gameUtils, constants
│   ├── App.jsx              # Routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind imports
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
🚀 Getting Started
Prerequisites
Node.js (v16 or later)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/your-username/memory-match-game.git
cd memory-match-game
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
Open your browser at http://localhost:5173

🎮 How to Play
Sign Up / Login – Use any email and password (demo accounts included)

Wallet – Add money using the wallet panel (starts with ₹1000 for new users)

Set Bet – Choose a bet amount (10–5000)

Play – Click one card from the top row and one from the bottom row

If the numbers match → you win 2× your bet

If they don’t match → you lose your bet

Keep Matching – Matched cards stay fixed; unmatched cards shuffle after every move and every 3 seconds

Win the Game – Match all 5 pairs to finish

Admin Access – Log in as admin@admin.com / admin123 to manage users

👑 Admin Panel Features
View all users with their email, role, signup date, balances

Edit any user’s wallet balance

Reset a user’s current game progress

Clear a user’s betting history

See real‑time game state and betting logs

🌐 Live Demo (Optional)
If you deploy the app, add a link here.

📄 License
This project is open‑source and available under the MIT License.

Enjoy the game! 😄
