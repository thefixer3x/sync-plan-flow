-- =============================================================================
-- Migration: Copy existing rows from public into spf (OPTIONAL)
-- =============================================================================
-- This migration is COMMENTED OUT by default.  Uncomment the statements you
-- need once you're ready to seed the spf schema with existing data.
--
-- If your tables have a project_id column, only rows matching the target
-- project are copied.  Otherwise all rows are copied.
-- =============================================================================

-- ── Reference data (small, safe to copy in full) ────────────────────────────

-- INSERT INTO spf.task_priorities (id, name, description)
--   SELECT id, name, description FROM public.task_priorities;

-- INSERT INTO spf.task_statuses
--   SELECT * FROM public.task_statuses;

-- ── Feature flags (copy all – no user/project scope) ────────────────────────

-- INSERT INTO spf.feature_flags
--   SELECT * FROM public.feature_flags;

-- ── Tasks (filter by project_id if applicable) ──────────────────────────────
-- Replace 'YOUR_PROJECT_ID' with the actual project UUID.

-- INSERT INTO spf.tasks
--   SELECT * FROM public.tasks
--   WHERE project_id = 'YOUR_PROJECT_ID';

-- INSERT INTO spf.sub_tasks
--   SELECT * FROM public.sub_tasks
--   WHERE task_id IN (
--     SELECT id FROM public.tasks WHERE project_id = 'YOUR_PROJECT_ID'
--   );

-- INSERT INTO spf.task_dependencies
--   SELECT * FROM public.task_dependencies
--   WHERE task_id IN (
--     SELECT id FROM public.tasks WHERE project_id = 'YOUR_PROJECT_ID'
--   );

-- ── User preferences (filter by user_id if needed) ─────────────────────────

-- INSERT INTO spf.user_preferences
--   SELECT * FROM public.user_preferences;
-- Or filter:
-- INSERT INTO spf.user_preferences
--   SELECT * FROM public.user_preferences
--   WHERE user_id = 'YOUR_USER_ID';
