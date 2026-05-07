# Frontend

This frontend is a React + Vite application using Clerk for authentication.

## Setup

1. Install dependencies
   - `npm install`

2. Copy environment variables
   - create `frontend/.env` from `frontend/.env.example`
   - set `VITE_API_URL` to the backend API URL, e.g. `http://localhost:3000`
   - set `VITE_CLERK_PUBLISHABLE_KEY` to your Clerk publishable key

## Run

```bash
npm run dev
```

Then open the URL shown by Vite, usually `http://localhost:5173`.

## Notes

- The app syncs signed-in Clerk users to the backend by calling `/api/users/sync`.
- The backend must be running before the frontend can load user data.
