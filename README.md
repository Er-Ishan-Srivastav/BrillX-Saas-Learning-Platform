# BrillX-Saas-Learning-Platform
This repository contains the source code for the BrillX platform, developed by our team as part of our 7th-semester capstone project.

✅ Prerequisites
Install Node.js (LTS recommended)
Install npm
Create a Clerk account to generate API keys

📦 Clone the Repository

Run:
git clone https://github.com/Priyanshu2773/BrillX-Saas-Learning-Platform.git
cd BrillX-Saas-Learning-Platform

🖥️ Frontend Setup
Navigate to frontend:
cd frontend

Install dependencies:
npm install

Create a .env file inside frontend and add:
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_CLERK_SECRET_KEY=your_clerk_secret_key_here

Start frontend server:
npm run dev
Default frontend URL: http://localhost:5173

⚙️ Backend Setup
Navigate to backend:
cd ..
cd backend

Install backend dependencies:
npm install

Create a .env file inside backend and add:

PORT=5000
DATABASE_URL=your_database_connection_url_here
JWT_SECRET=your_jwt_secret_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

Start backend server:
npm run server
Start Backend Server
npm run server
