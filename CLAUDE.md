# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project structure

Two independent sibling projects, **not** an npm/yarn workspace (no root `package.json`):

- `backend/` — Express 4 API server (MongoDB via Mongoose). Controllers live in `backend/controls/` (note: "controls", not "controllers") and in per-route `ctrls.js` files under `backend/routes/api/**` — check both when tracing a route's logic.
- `frontend/` — Vue 2 app (Vue CLI, Vuex, Vue Router, Bootstrap-Vue).

Package manager is **yarn** (yarn.lock in both dirs; no package-lock.json).

## Commands

Backend (from `backend/`):
- `yarn start` — runs `node ./bin/www`, listens on `process.env.PORT || 3000`. Requires a local MongoDB running on `27017` with a `nemv` database (`backend/config/config.js`).
- No `test` or `lint` script exists.

Frontend (from `frontend/`):
- `yarn serve` — dev server on `process.env.VUE_APP_PORT || 8081`. It does **not** proxy `/api` to the backend — frontend code calls the backend via hardcoded `http://localhost:3000/api/...` URLs, so the backend must be running separately and its CORS flag (`backend/config/config.js` → `web.cors`) must stay enabled for local dev.
- `yarn build` — outputs directly into `../backend/public` (see `vue.config.js` `outputDir`). Production deploy = build frontend, then `backend` serves the static bundle plus `/api/*` (SPA routing handled via `connect-history-api-fallback`).
- `yarn lint` — ESLint using `@vue/standard` config (StandardJS style), embedded in `frontend/package.json`.

No CI config and no test framework exist anywhere in the repo.

## Gotchas

- `backend/config/config.js` is listed in `.gitignore` but is **already tracked in git** — gitignore has no effect on it. Any local edits (e.g. real credentials) will show up as a normal diff and can be accidentally committed.
- `backend/views/*.pug` and the `pug` dependency are dead code — `app.js` explicitly disables the view engine since the backend is API-only.
- `backend/playGround.js` is a scratch file, required-but-commented-out in `app.js`. Don't wire it back in without checking why it was disabled.
- `frontend/src/` contains several experimental `App_*.vue` files (`App_Baseline.vue`, `App_GoogleContact.vue`, `App_GoogleKeep.vue`, `App_Sendbox.vue`, `App Youtube.vue`) — only `App.vue` is wired into `main.js`/the build. Treat the others as reference scratch, not live code.
- A top-level `frontend/src/router.js` or `frontend/src/store.js` takes precedence over `router/index.js` / `store/index.js` if it reappears (e.g. from a bad merge) — this has happened before and silently broke the app. Delete stray top-level `router.js`/`store.js` if you see them.
- `mod` (update) handlers in `backend/controls/*` and `backend/routes/api/**/ctrls.js` should only `$set` an explicit allowlist of fields extracted from `req.body` — never spread the raw body into `$set`, since schema fields like `group_ids`, `commentIds`, `countOfView` are otherwise attacker-settable even though the UI never sends them.
