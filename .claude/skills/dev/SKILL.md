---
name: dev
description: Start both the backend (Express + MongoDB) and frontend (Vue) dev servers for this repo. Use when the user wants to run, start, or preview the app locally.
---

There is no single command that starts both halves of this app — start them separately:

1. Confirm a local MongoDB is reachable at `mongodb://localhost:27017/nemv` (per `backend/config/config.js`). If it's not running, tell the user rather than silently failing.
2. Start the backend in the background: `cd backend && yarn start` (listens on port 3000; `web.cors` must stay `true` in `backend/config/config.js` for the frontend dev server to reach it).
3. Start the frontend in the background: `cd frontend && yarn serve` (listens on port 8081 by default; does not proxy `/api`, it calls `http://localhost:3000/api/...` directly).
4. Report both URLs to the user (backend `http://localhost:3000`, frontend `http://localhost:8081`) once both have finished booting — watch each process's output for the "compiled successfully" / listening message rather than guessing a fixed wait time.

Stop both processes when the user is done rather than leaving them running silently.
