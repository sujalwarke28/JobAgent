# AI Job Application Copilot

An AI-powered job matching platform built with the MERN stack and Google Gemini API.

## Project Structure
- `backend/`: Express.js backend connecting to MongoDB Atlas & Gemini AI
- `frontend/`: React + Vite frontend using Tailwind CSS and Firebase Auth

## Initial Setup

1. **Install Dependencies**
   From the root folder, run:
   ```bash
   npm run install-all
   ```

2. **Environment Variables**
   - Copy `.env.example` to `.env` in the root (if sharing vars) or individually inside `backend/.env` and `frontend/.env`.
   - Update with your MongoDB URI, Gemini API Key, and Firebase configurations.

3. **Database Setup**
   - The backend checks if the Job database is empty and automatically runs `backend/seed.js` on the first startup.
   - Or you can manually seed: `cd backend && npm run seed`

4. **Running the Application**
   From the root directory:
   ```bash
   npm run dev
   ```
   This uses `concurrently` to spin up both the Vite dev server and Express backend.

## Execution Phases
- **Phase 1**: Foundation + Backend Core (Database schemas, REST routes)
- **Phase 2**: AI Services (Gemini matching, automated cover letters)
- **Phase 3**: Frontend UI and Application Integration
