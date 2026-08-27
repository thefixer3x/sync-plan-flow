-- =============================================================================
-- Migration: Seed spf from control_room (OPTIONAL)
-- =============================================================================
-- This migration is COMMENTED OUT by default.  Uncomment the statements you
-- need once you're ready to backfill the spf schema from existing data.
--
-- SOURCE: control_room (NOT public) – the task tables live in control_room on
-- this shared Supabase instance, not in the public schema.
--
-- IMPORTANT: Always use explicit column lists (never SELECT *) so this script
-- remains stable if the source table gains or reorders columns in the future.
-- =============================================================================

-- ── Reference data (small, safe to copy in full) ────────────────────────────
-- Skip if migration 20260221000000 already seeded sensible defaults.

-- INSERT INTO spf.task_priorities (id, name, description)
--   SELECT id, name, description
--   FROM control_room.task_priorities;

-- INSERT INTO spf.task_statuses (id, name, description)
--   SELECT id, name, description
--   FROM control_room.task_statuses;

-- ── Feature flags (copy all – no user/project scope) ────────────────────────

-- INSERT INTO spf.feature_flags (name, enabled, rollout_pct, description, created_at, updated_at)
--   SELECT name, enabled,
--          COALESCE(rollout_pct, 0),
--          description, created_at, updated_at
--   FROM control_room.feature_flags;

-- ── Tasks (filter by project_id) ─────────────────────────────────────────────
-- Replace 'YOUR_PROJECT_ID' with the actual project UUID.

-- INSERT INTO spf.tasks
--       (id, title, description, project_id,
--        status_id, priority_id, assignee_id, due_date, created_at, updated_at)
--   SELECT id, title, description, project_id,
--          status_id, priority_id, assignee_id, due_date, created_at, updated_at
--   FROM control_room.tasks
--   WHERE project_id = 'YOUR_PROJECT_ID';

-- INSERT INTO spf.sub_tasks (id, task_id, title, completed, created_at)
--   SELECT id, task_id, title, completed, created_at
--   FROM control_room.sub_tasks
--   WHERE task_id IN (
--     SELECT id FROM control_room.tasks WHERE project_id = 'YOUR_PROJECT_ID'
--   );

-- INSERT INTO spf.task_dependencies (id, task_id, depends_on_task_id, created_at)
--   SELECT id, task_id, depends_on_task_id, created_at
--   FROM control_room.task_dependencies
--   WHERE task_id IN (
--     SELECT id FROM control_room.tasks WHERE project_id = 'YOUR_PROJECT_ID'
--   );
