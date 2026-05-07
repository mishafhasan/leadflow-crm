<div align="center">

# LeadFlow CRM

**Full-stack CRM with AI-powered note summarisation.**  
Track leads, manage your pipeline, and get instant AI briefings - all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?logo=postgresql&logoColor=white&style=flat-square)](https://supabase.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-Gemma_4-4285F4?logo=google&logoColor=white&style=flat-square)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)](LICENSE)

[Live Demo](#) · [Report a Bug](https://github.com/mishafhasan/leadflow-crm/issues) · [Request Feature](https://github.com/mishafhasan/leadflow-crm/issues)

</div>

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 3, Framer Motion |
| **Backend** | Node.js, Express 5 |
| **Database** | PostgreSQL (Supabase) via raw SQL with `pg` |
| **Auth** | JWT (`jsonwebtoken` + `bcryptjs`) |
| **AI** | Google Gemma 4 via `@google/genai` SDK |
| **Security** | `helmet`, CORS, bcrypt password hashing |

---

## Features

- **🏠 Animated Landing Page** - live pipeline chart & stats counters, scroll-reveal effects, graceful fallback if backend is down
- **🔐 JWT Authentication** - email/password login, token auto-attached to every request, protected routes
- **📊 Dashboard** - aggregate stats, recent leads, top salespeople; parallel queries via `Promise.all`
- **📋 Leads CRUD** - create, read, update, delete; filter by status/source/assignee; paginated list with search
- **📝 Notes** - scoped per lead with timestamps and author
- **✨ AI Note Summariser** - one-click structured briefing via Gemma 4 (Overall Status, Key Points, Customer Sentiment, Suggested Next Action); 60-second cooldown respects free-tier rate limits; graceful 503/429 error handling
- **🔒 Security** - `helmet` headers, CORS restricted to frontend origin, passwords never in API responses

---

## Project Structure

```
leadflow-crm/
├── db/db.sql                         # Schema + seed data
├── server/                           # Express backend
│   ├── server.js                     # Entry point
│   ├── scripts/                      # seed, check-db, fix-admin-password
│   └── src/
│       ├── config/db.js              # pg connection pool
│       ├── controllers/              # auth, leads, notes, dashboard, public
│       ├── middleware/               # auth (JWT), errorHandler
│       ├── models/                   # user, lead, note (raw SQL)
│       ├── services/ai.service.js   # Google Gemma 4 integration
│       └── routes/                   # auth, leads, notes, dashboard, public
├── src/                              # React + TypeScript frontend
│   ├── components/                   # layout, sections, ui primitives
│   ├── context/AuthContext.tsx       # Login/logout state
│   ├── pages/                        # Landing, Login, Dashboard, Leads, LeadDetail
│   ├── services/api.ts              # Centralised fetch wrapper
│   ├── types/                        # Shared TypeScript interfaces
│   └── utils/                        # Formatters, status colours
└── postman/                          # API test collection
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 · **npm** ≥ 9 · **Supabase** project (free tier)

### 1. Database

Open Supabase → SQL Editor → run [`docs/db.sql`](docs/db.sql). Then seed sample data:

```bash
cd server && node scripts/seed.js
```

### 2. Backend

```bash
cd server
npm install
copy .env.example .env   # fill in values (see Environment Variables below)
npm run dev
```

Server starts at **http://localhost:5000** · Health check: **/health**

### 3. Frontend

```bash
npm install
npm run dev
```

Frontend starts at **http://localhost:3000**

---

## Environment Variables

### `server/.env`

| Variable | Description | Example |
|---|---|---|
| `PORT` | Express port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `DATABASE_URL` | Supabase connection string | `postgresql://user:pass@host/db` |
| `JWT_SECRET` | Secret for signing JWTs | _generate with `crypto.randomBytes(32).toString('hex')`_ |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `FRONTEND_URL` | Frontend origin (CORS) | `http://localhost:5173` |
| `GEMINI_API_KEY` | Google AI key for note summariser | `AIzaSy...` |

> 💡 Get a free key at [Google AI Studio](https://aistudio.google.com/apikey). The AI feature gracefully degrades - the CRM works perfectly without it.

### `src/.env` (optional)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend base URL | `http://localhost:5000` |

---

## Deployment

### Backend → Render

1. New **Web Service** · Root Directory: `server` · Build: `npm install` · Start: `node server.js`
2. Add env vars: `NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `FRONTEND_URL`, `GEMINI_API_KEY`

### Frontend → Vercel

1. New **Project** · Framework: Vite · Build: `npm run build` · Output: `dist`
2. Add env var: `VITE_API_URL` = your Render URL (no trailing slash)

> After Vercel deploys, update `FRONTEND_URL` on Render to allow CORS.

---

## API Reference

All protected routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | ❌ | Login - returns JWT + user |
| `GET` | `/api/auth/me` | ✅ | Current user |
| `GET` | `/api/leads` | ✅ | List leads (supports filters & pagination) |
| `POST` | `/api/leads` | ✅ | Create lead |
| `GET` | `/api/leads/:id` | ✅ | Get lead by ID |
| `PUT` | `/api/leads/:id` | ✅ | Update lead |
| `DELETE` | `/api/leads/:id` | ✅ | Delete lead |
| `GET` | `/api/leads/:leadId/notes` | ✅ | Notes for a lead |
| `POST` | `/api/leads/:leadId/notes` | ✅ | Add a note |
| `POST` | `/api/leads/:leadId/notes/summary` | ✅ | AI summary (Gemma 4) |
| `GET` | `/api/dashboard/stats` | ✅ | Stats, pipeline, leaderboard |
| `GET` | `/api/public/stats` | ❌ | Public landing page stats (no PII) |

---

## Test Login

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `password123` |

> ⚠️ Change these before production.

---

## Known Limitations

- **Auth storage**: JWTs in `localStorage`; production should use HTTP-only cookies
- **No RBAC**: single unified view; real CRM needs role-based access
- **Validation**: frontend + basic backend checks; add Zod/Joi for stricter integrity
- **No real-time**: stats update on refresh; no WebSocket integration
- **In-memory pagination**: server-side cursor pagination needed at scale
- **AI rate limits**: free tier is ~2 RPM; UI enforces 60s cooldown; paid tier or queue system needed for production
- **AI optional**: without `GEMINI_API_KEY`, the feature returns 503; the rest of the CRM is unaffected

---

## Reflection

**Key decisions:**
- **Raw SQL over ORM**: `pg` keeps dependencies small and queries explicit
- **Supabase**: zero-install managed Postgres, easy for reviewers
- **Public `/api/public/stats`**: live stats for the landing page without requiring login; only exposes aggregates, no PII
- **Idempotent seeds**: fixed UUIDs ensure consistent foreign keys across re-runs
- **Gemma 4 via `@google/genai`**: isolated in `ai.service.js`, lazily initialised; CRM stays fully functional without an API key; 60s cooldown respects free-tier limits

**What I learned:**
- Structuring a clean Express MVC with separated routes, controllers, and models
- Managing complex React 19 UI state (e.g. currency abbreviation to prevent layout shifts)
- Coordinating dual deployments across Render and Vercel with strict CORS management
- Graceful degradation with third-party AI APIs specific error handling for 503/429/general failures

---

<div align="center">
  Developed by <b>Mishaf Hasan</b>
</div>
