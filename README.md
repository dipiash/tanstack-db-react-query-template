# tanstack-db-react-query-template

## Overview
This Vite-powered template pairs TanStack React Query with TanStack DB layer to showcase optimistic updates and live queries in app.
It bootstraps a mock-backed users table, wiring collection sync, optimistic mutations and client-side pagination so you can explore the data workflows before pointing at a real API.

## Prerequisites
- Node.js 24+

## Getting Started
1. Install dependencies: `npm install`
2. Launch the dev server with hot reload: `npm run dev`
3. Visit the printed URL (default `http://localhost:5173`) to interact with the demo
4. Build assets when ready to deploy or share: `npm run build`
5. Optionally preview the built bundle locally: `npm run preview`

## Project Structure
```text
.
├─ dist/                      # Generated Vite build output (ignored in source control)
├─ src/
│  ├─ api/
│  │  ├─ client/              # Shared QueryClient instance
│  │  ├─ handlers/            # Mock REST handlers simulating backend behavior
│  │  └─ types/               # TypeScript DTOs for API payloads
│  ├─ db/                     # TanStack DB collections and sync helpers
│  ├─ hooks/                  # Reusable hooks for data fetching and mutations
│  ├─ App.tsx                 # Users table UI and pagination logic
│  └─ index.tsx               # React entry point and root render
├─ eslint.config.mjs          # Project-wide ESLint configuration (Nimbus Clean preset)
├─ package.json               # Scripts, dependencies, and metadata
├─ tsconfig.json              # TypeScript compiler options
└─ vite.config.ts             # Vite build and dev server configuration
```

## Available Commands
- `npm run dev` — start the Vite dev server with hot module replacement
- `npm run build` — type-check with project references, then emit a production bundle to `dist/`
- `npm run preview` — serve the latest build output for manual smoke testing
- `npm run lint` — run ESLint on all `.ts`/`.tsx` sources using the configured presets
- `npm run lint:fix` — apply ESLint auto-fixes where possible
- `npm run typecheck` — run TypeScript in no-emit mode to surface typing regressions

## Development Notes
The demo uses mock user data from `src/api/handlers/users.mock.ts`.
Replace these handlers with real API calls as you integrate a backend.
Collections in `src/db` must be ready (`ensureUsersCollectionIsReady`) before mutating to keep TanStack DB and React Query in sync.
