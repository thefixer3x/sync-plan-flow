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

## Supabase: Schema Isolation

This Supabase project (`ptnrwrgzrsbocgxlpvhd`) hosts tables for multiple applications.  To avoid naming collisions and keep concerns separated, Sync Plan Flow uses its own Postgres schema: **`spf`**.

### Why schema isolation?

- **No collisions** – tables like `tasks` or `feature_flags` won't conflict with identically-named tables in `public` belonging to other apps.
- **Clean RLS boundaries** – policies are scoped to the schema, so you can tighten or relax access without affecting other apps.
- **Easier cleanup** – dropping or resetting the schema removes only this app's data.

### Tables in `spf`

| Table | Purpose |
|---|---|
| `tasks` | Core task records |
| `sub_tasks` | Checklist items within a task |
| `task_dependencies` | Blocked-by relationships |
| `task_priorities` | Reference: priority levels |
| `task_statuses` | Reference: status labels |
| `user_preferences` | Per-user settings (has `user_id` → RLS enforced) |
| `feature_flags` | App-level feature toggles |

### 1) Expose the schema in Supabase (required)

> **Supabase Dashboard → Settings → API → Exposed schemas → add `spf`**

Without this step, PostgREST will not serve the schema and client queries will return 404.

### 2) Run migrations

Migrations live in `supabase/migrations/`.  Apply them in order:

```bash
# Option A: Supabase CLI (recommended)
supabase db push

# Option B: paste into Supabase SQL Editor manually
# 1. 20260221000000_create_spf_schema.sql   – creates schema + tables + RLS
# 2. 20260221000001_seed_spf_from_public.sql – (optional, commented) copies existing rows
```

The seed migration is fully commented out.  Uncomment only the statements you need, replacing placeholder values (`YOUR_PROJECT_ID`, `YOUR_USER_ID`) with real IDs.

### 3) Query the schema in code

```ts
import { db } from "@/integrations/supabase/client";

// All data queries go through the schema-scoped client
const { data, error } = await db.from("tasks").select("*");

// Auth operations still use the base client
import { supabase } from "@/integrations/supabase/client";
await supabase.auth.signInWithPassword({ email, password });
```

### Running migrations safely

- Always back up before running destructive migrations.
- Migrations are additive — they create new objects and never modify `public`.
- Test in a Supabase branch or staging project first when possible.
- After running, verify with: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'spf';`

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
