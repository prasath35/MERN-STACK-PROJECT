# Second Project

A full-stack example with React + Vite frontend, Clerk authentication, and Express + MongoDB backend.

## Project structure

- `backend/` — Express API, MongoDB connection, Inngest event handlers, user routes.
- `frontend/` — React app built with Vite, Clerk auth integration, user dashboard.

## Setup

1. Install dependencies
   - `cd backend`
   - `npm install`
   - `cd ../frontend`
   - `npm install`

2. Create local environment files
   - `backend/.env` from `backend/.env.example`
   - `frontend/.env` from `frontend/.env.example`

3. Configure environment values
   - `backend/.env`
     - `DB_URL` = MongoDB connection string
     - `CLIENT_URL` = `http://localhost:5173`
     - `PORT` = `3000`
   - `frontend/.env`
     - `VITE_API_URL` = `http://localhost:3000`
     - `VITE_CLERK_PUBLISHABLE_KEY` = your Clerk publishable key

## Running locally

Use two separate terminal windows:

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

Then open the frontend URL shown by Vite, usually `http://localhost:5173`.

## Notes

- The frontend uses Clerk auth. You must set `VITE_CLERK_PUBLISHABLE_KEY` in `frontend/.env`.
- The backend sync endpoint is available at `http://localhost:3000/api/users/sync`.
- The app already includes a placeholder `backend/.env.example` and `frontend/.env.example`.
