# Sync Plan Flow (AI Productivity Hub)

An offline-first, ultra-modern task manager and productivity hub that helps you plan, execute, and measure — without forcing you to abandon the tools you already use.

**Core idea:** your AI is **triggered intelligently** (events → suggestions → approvals), not “always on.”

---

## What’s included

### ✅ Task System (Local-first)

- Task CRUD with persistence
- Kanban + List views
- Filters + quick add
- Subtasks / checklists
- Recurrence (daily/weekly/monthly)
- Dependencies (blocked tasks)
- Tags & categories
- Keyboard shortcuts

### ✅ Productivity Layer

- Dashboard widgets (today’s tasks, quick wins, upcoming items)
- Focus workflows (planned)
- Suggestions engine (planned / Phase 2)

### ✅ Personalization

- Theme presets + custom theme builder
- Reduce Motion support (accessibility)
- AI personality presets (Coach, Analyst, Zen, etc.)
- Memory visualizer (local context bank)
- Social productivity (accountability, goals, streaks)

### ✅ Privacy & Ownership

- Local-first storage and user control patterns
- Clear “why am I seeing this?” style transparency (in progress)

### ✅ PWA / Offline (Phase 1+)

- Installable PWA
- Offline badge + offline-safe task management
- Cache reset controls to prevent stale builds

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **UI:** Tailwind + shadcn/ui
- **Local persistence:** IndexedDB (Dexie / idb pattern)
- **Backend (optional / staged):** Supabase (Postgres, Auth, RLS)

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm / npm / bun (choose one)

### Install & run

```bash
# install
npm install

# dev
npm run dev

# build
npm run build

# preview
npm run preview
```

---

## PWA Notes (Important)

During active development, service workers can cause stale cache issues.
Use the in-app **Reset Offline Cache** action (Settings) if you ever see a blank screen after deploy.

Recommended workflow:

- Keep “Offline Mode / PWA” toggle OFF during heavy refactors
- Enable it when testing install/offline behavior

---

## Supabase: Schema Isolation (Recommended)

This Supabase project contains many existing tables, so this app should live in its own schema to avoid collisions.

**Suggested schema:** `spf`

### 1) Create schema + clone tables

Use Supabase SQL Editor or migrations to:

- `create schema spf;`
- clone tables into `spf.tasks`, `spf.sub_tasks`, etc.
- enable RLS + policies

### 2) Expose schema in Supabase

Supabase Dashboard → **Settings → API → Exposed schemas**
Add: `spf`

### 3) Query schema in supabase-js

```ts
const db = supabase.schema("spf");
const { data, error } = await db.from("tasks").select("*");
```

---

## Roadmap (High level)

### Phase 1 — Cohesion + Modern Task Engine + Safe PWA

- Unified state store
- Task fundamentals (subtasks, recurrence, dependencies)
- Reduce motion & design system lock
- PWA hardening + cache reset

### Phase 2 — Orchestration MVP

- Event → trigger → suggestion → action loop
- Focus mode + daily plan
- Suggestions influenced by Memory + Personality
- Feature flags for future integrations

### Phase 3+ — Controlled rollout

- Auth + RLS
- Cloud sync (local-first → optional sync)
- Calendar integration (read-only first)
- Email → task ingestion (flagged)
- Monetization/tier mapping (flagged)

---

## Contributing (internal)

- Create feature branches per epic (`feat/...`, `fix/...`, `db/...`)
- Keep migrations additive and reversible
- Never disable RLS in production

---

## License

TBD
