<div align="center">

# LeadFlow CRM

**A full-stack Customer Relationship Management system built as a take-home assessment.**  
Track leads, manage your sales pipeline, and collaborate with your team — all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-4169E1?logo=postgresql&logoColor=white&style=flat-square)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)](LICENSE)

[Live Demo](#) · [Report a Bug](https://github.com/mishafhasan/leadflow-crm/issues) · [Request Feature](https://github.com/mishafhasan/leadflow-crm/issues)

</div>

---
## About the Project

LeadFlow CRM is a full-stack web application designed to help sales teams manage leads through a structured pipeline. Built as an internship take-home assessment, it demonstrates a clean separation between frontend and backend, secure JWT authentication, real-time data visualisation, and production-ready code patterns.

**Key goals:**
- Replace dummy/hardcoded data with a real PostgreSQL database
- Implement secure, stateless JWT authentication
- Build a RESTful API following the MVC pattern
- Create a polished, animated landing page that fetches live stats
- Write clean, well-commented, easy-to-explain code

---

## Tech Stack

| Layer        | Technology                                       |
|--------------|--------------------------------------------------|
| **Frontend** | React 19, TypeScript, Vite 7, Tailwind CSS 3    |
| **UI Library** | Radix UI primitives, shadcn/ui, Framer Motion |
| **Backend**  | Node.js, Express 5                               |
| **Database** | PostgreSQL (hosted on Supabase)                  |
| **Auth**     | JSON Web Tokens (JWT) via `jsonwebtoken`         |
| **ORM/DB**   | Raw SQL via `pg` (node-postgres) connection pool |
| **Security** | `bcryptjs` password hashing, `helmet` headers   |
| **Dev Tools**| nodemon, ESLint, TypeScript compiler             |

---

## Features

### 🏠 Public Landing Page
- Animated hero section with gradient text and scroll-reveal effects
- **Live pipeline visualisation** — bar chart built from real database data
- **Live stats counters** — Total Leads, Won Deals, Pipeline Value, Team Members
- Interactive 3D-perspective demo section with floating stat cards
- Features, How It Works, Testimonials, Pricing, and CTA sections
- Graceful fallback to hardcoded values if the backend is unavailable

### 🔐 Authentication
- Email + password login via JWT
- Token stored in `localStorage` and automatically attached to every API request
- Protected routes redirect unauthenticated users to the login page
- Passwords hashed with bcrypt (salt rounds: 10)

### 📊 Dashboard
- Aggregate stats: total leads, pipeline value, won value, status breakdown
- Recent leads feed and top salespeople leaderboard
- All queries run in parallel using `Promise.all` for fast load times

### 📋 Leads Management
- Full **CRUD** — Create, Read, Update, Delete leads
- Filter leads by status, source, or assigned user
- Paginated list view with search
- Detailed lead page showing company info, contact details, and activity

### 📝 Notes
- Add internal notes to any lead (call logs, follow-ups, meeting summaries)
- Notes are scoped per lead and stored with timestamps and author

### 🔒 Security
- `helmet` middleware sets secure HTTP response headers
- CORS restricted to the configured frontend origin
- JWT expiry enforced on every protected request
- Passwords never returned in any API response

---

## Architecture

LeadFlow follows a **lightweight MVC pattern** on the backend and a **feature-based component structure** on the frontend.

```
Frontend (React + Vite)          Backend (Node.js + Express)
┌─────────────────────────┐      ┌────────────────────────────────┐
│  Pages                  │      │  Routes  → Controllers         │
│  ├── LandingPage        │ HTTP │  ├── /api/auth    → auth.ctrl  │
│  ├── LoginPage          │ ───► │  ├── /api/leads   → leads.ctrl │
│  ├── DashboardPage      │      │  ├── /api/.../notes→ notes.ctrl│
│  ├── LeadsPage          │      │  ├── /api/dashboard→ dash.ctrl │
│  └── LeadDetailPage     │      │  └── /api/public  → pub.ctrl  │
│                         │      │                                │
│  Services               │      │  Models (SQL queries)          │
│  └── api.ts             │      │  ├── user.model.js             │
│     ├── authApi         │      │  ├── lead.model.js             │
│     ├── leadsApi        │      │  └── note.model.js             │
│     ├── notesApi        │      │                                │
│     ├── dashboardApi    │      │  Middleware                     │
│     └── publicApi       │      │  ├── auth.js (JWT verification)│
│                         │      │  └── errorHandler.js           │
│  Context                │      │                                │
│  └── AuthContext        │      │  Database (Supabase PostgreSQL) │
└─────────────────────────┘      └────────────────────────────────┘
```

---

## Project Structure

```
leadflow-crm/
├── docs/
│   ├── db.sql                    # Schema + seed data (run once in Supabase)
│   └── full_stack_crm_take_home_assessment.md
│
├── server/                       # Node.js + Express backend
│   ├── .env                      # Environment variables (see below)
│   ├── server.js                 # Entry point — DB check + server start
│   ├── scripts/
│   │   ├── seed.js               # Populate DB with sample data
│   │   ├── fix-admin-password.js # Utility: re-hash admin password
│   │   └── check-db.js           # Utility: verify DB tables + counts
│   └── src/
│       ├── app.js                # Express app setup (middleware, routes)
│       ├── config/
│       │   └── db.js             # pg connection pool
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── leads.controller.js
│       │   ├── notes.controller.js
│       │   ├── dashboard.controller.js
│       │   └── public.controller.js
│       ├── middleware/
│       │   ├── auth.js           # JWT verification
│       │   └── errorHandler.js   # Global error handler
│       ├── models/
│       │   ├── user.model.js
│       │   ├── lead.model.js
│       │   └── note.model.js
│       └── routes/
│           ├── auth.routes.js
│           ├── leads.routes.js
│           ├── notes.routes.js
│           ├── dashboard.routes.js
│           └── public.routes.js
│
├── src/                          # React + TypeScript frontend
│   ├── components/
│   │   ├── layout/               # LandingNavbar, AppNavbar
│   │   ├── sections/             # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PipelineVizSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── DemoSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── PricingSection.tsx
│   │   │   ├── CTASection.tsx
│   │   │   └── FooterSection.tsx
│   │   └── ui/                   # Reusable primitives (AnimatedCounter, ScrollReveal…)
│   ├── context/
│   │   └── AuthContext.tsx       # Login/logout state, token management
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LeadsPage.tsx
│   │   └── LeadDetailPage.tsx
│   ├── services/
│   │   └── api.ts                # Centralised fetch wrapper + all API calls
│   ├── types/                    # Shared TypeScript interfaces
│   └── utils/                    # Helpers (formatters, etc.)
│
├── postman/                      # Postman collection for API testing
├── package.json                  # Frontend dependencies
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **Supabase** project (free tier works fine) with a PostgreSQL database

### Database Setup

1. Open your Supabase project → **SQL Editor**
2. Copy and paste the full contents of [`docs/db.sql`](docs/db.sql) and run it.  
   This creates the `users`, `leads`, and `notes` tables plus indexes and a trigger.

3. Populate with sample data by running the seed script *(after completing the backend setup below)*:
   ```bash
   cd server
   node scripts/seed.js
   ```

### Backend Setup

```bash
# 1. Navigate to the server directory
cd server

# 2. Install dependencies
npm install

# 3. Copy the example env file and fill in your values
copy .env.example .env
# (Edit .env — see Environment Variables section below)

# 4. Start the development server (with hot-reload via nodemon)
npm run dev
```

The server starts on **http://localhost:5000**  
Health check: **http://localhost:5000/health**

### Frontend Setup

```bash
# From the project root (leadflow-crm/)

# 1. Install dependencies
npm install

# 2. Create an .env file (optional — defaults to localhost:5000)
# VITE_API_URL=http://localhost:5000

# 3. Start the Vite dev server
npm run dev
```

The frontend starts on **http://localhost:3000**

---

## Environment Variables

### `server/.env`

| Variable         | Description                                            | Example                              |
|------------------|--------------------------------------------------------|--------------------------------------|
| `PORT`           | Port the Express server listens on                     | `5000`                               |
| `NODE_ENV`       | Environment (`development` / `production`)             | `development`                        |
| `DATABASE_URL`   | Full Supabase PostgreSQL connection string             | `postgresql://user:pass@host/db`     |
| `JWT_SECRET`     | Long, random secret for signing JWTs                   | `your-very-long-random-secret-here`  |
| `JWT_EXPIRES_IN` | Token lifetime                                         | `7d`                                 |
| `FRONTEND_URL`   | Frontend origin (used for CORS)                        | `http://localhost:5173`              |

**Generate a secure JWT secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### `src/.env` (optional)

| Variable        | Description                          | Default                    |
|-----------------|--------------------------------------|----------------------------|
| `VITE_API_URL`  | Backend base URL used by the frontend | `http://localhost:5000`   |

---

## API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint          | Auth | Description                     |
|--------|-------------------|------|---------------------------------|
| `POST` | `/api/auth/login` | ❌   | Login — returns JWT + user info |
| `GET`  | `/api/auth/me`    | ✅   | Get the current logged-in user  |

### Leads

| Method   | Endpoint           | Auth | Description                       |
|----------|--------------------|------|-----------------------------------|
| `GET`    | `/api/leads`       | ✅   | List all leads (supports filters) |
| `POST`   | `/api/leads`       | ✅   | Create a new lead                 |
| `GET`    | `/api/leads/:id`   | ✅   | Get a single lead by ID           |
| `PUT`    | `/api/leads/:id`   | ✅   | Update a lead                     |
| `DELETE` | `/api/leads/:id`   | ✅   | Delete a lead                     |

### Notes

| Method | Endpoint                         | Auth | Description               |
|--------|----------------------------------|------|---------------------------|
| `GET`  | `/api/leads/:leadId/notes`       | ✅   | Get all notes for a lead  |
| `POST` | `/api/leads/:leadId/notes`       | ✅   | Add a note to a lead      |

### Dashboard

| Method | Endpoint                | Auth | Description                                |
|--------|-------------------------|------|--------------------------------------------|
| `GET`  | `/api/dashboard/stats`  | ✅   | Aggregate stats, recent leads, leaderboard |

### Public (no auth required)

| Method | Endpoint            | Auth | Description                                      |
|--------|---------------------|------|--------------------------------------------------|
| `GET`  | `/api/public/stats` | ❌   | Safe aggregate stats for the public landing page |

---

## Default Credentials

After running `node scripts/seed.js`, these accounts are available:

| Role         | Email                  | Password      |
|--------------|------------------------|---------------|
| Admin        | `admin@example.com`    | `password123` |

> ⚠️ **Change these before deploying to production.**

---

## Scripts

### Backend (`server/`)

| Script                              | Description                                    |
|-------------------------------------|------------------------------------------------|
| `npm run dev`                       | Start with nodemon (hot-reload)                |
| `npm start`                         | Start without nodemon (production)             |
| `node scripts/seed.js`              | Wipe the DB and insert fresh sample data       |
| `node scripts/check-db.js`          | Print table names and row counts               |
| `node scripts/fix-admin-password.js`| Re-hash and update the admin password          |

### Frontend (`/`)

| Script          | Description                                |
|-----------------|--------------------------------------------|
| `npm run dev`   | Start Vite development server              |
| `npm run build` | Type-check + build for production          |
| `npm run lint`  | Run ESLint                                 |
| `npm run preview`| Preview the production build locally     |

---

## Design Decisions

**Why raw SQL instead of an ORM like Prisma?**  
For a project of this scope, raw SQL with the `pg` pool keeps the dependency tree small and makes every query explicit and easy to read. It's also a better demonstration of SQL knowledge.

**Why JWT in `localStorage` instead of HTTP-only cookies?**  
For simplicity in this assessment context. In a production app, HTTP-only cookies would be preferred to mitigate XSS risks.

**Why Supabase instead of a local PostgreSQL instance?**  
Supabase provides a managed cloud database with no local installation required, making it easy for reviewers to run the project. The connection pooler (Supavisor) is configured automatically.

**Why a public `/api/public/stats` endpoint?**  
The landing page should display live stats without requiring the visitor to be logged in. The endpoint exposes only aggregate numbers — no names, emails, or IDs — so there is no privacy concern.

**Why fixed UUIDs in `seed.js`?**  
Fixed UUIDs ensure that foreign key references (e.g. `notes.lead_id`) remain consistent across re-runs of the seed script, making development and debugging predictable.

---

<div align="center">
  Made with ❤️ as part of a full-stack internship assessment
</div>