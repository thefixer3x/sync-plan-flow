-- =============================================================================
-- Migration: Create isolated "spf" schema for Sync Plan Flow
-- =============================================================================
-- This migration creates a dedicated Postgres schema so this app's tables
-- live separately from the shared public schema.  The tables are cloned from
-- public (structure only – no data) and RLS policies are added where a
-- user_id column exists.
--
-- IMPORTANT: After running this migration you must also expose the schema
-- via the Supabase Dashboard:
--   Settings -> API -> Exposed schemas -> add "spf"
-- Otherwise PostgREST will not serve it and client queries will 404.
-- =============================================================================

-- 1. Create the schema
-- ---------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS spf;

-- 2. Grant usage so PostgREST roles can access it
-- ---------------------------------------------------------------------------
GRANT USAGE ON SCHEMA spf TO anon, authenticated, service_role;

-- Grant default privileges so future tables are also accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA spf
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA spf
  GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated, service_role;

-- 3. Clone table structures from public into spf
--    INCLUDING ALL copies: defaults, constraints, indexes, comments, etc.
-- ---------------------------------------------------------------------------

-- Core task tables
CREATE TABLE spf.tasks           (LIKE public.tasks           INCLUDING ALL);
CREATE TABLE spf.sub_tasks       (LIKE public.sub_tasks       INCLUDING ALL);
CREATE TABLE spf.task_dependencies (LIKE public.task_dependencies INCLUDING ALL);

-- Reference tables (used by tasks via priority_id / status_id)
CREATE TABLE spf.task_priorities (LIKE public.task_priorities INCLUDING ALL);
CREATE TABLE spf.task_statuses   (LIKE public.task_statuses   INCLUDING ALL);

-- User & feature tables
CREATE TABLE spf.user_preferences (LIKE public.user_preferences INCLUDING ALL);
CREATE TABLE spf.feature_flags    (LIKE public.feature_flags    INCLUDING ALL);

-- 4. Grant explicit table-level permissions
-- ---------------------------------------------------------------------------
-- authenticated and service_role receive full DML on all tables;
-- anon is intentionally restricted to SELECT on reference/public tables only
-- (see per-table grants below) to align with the RLS policy intent.
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA spf
  TO authenticated, service_role;

-- anon: SELECT-only on the three reference/read-only tables that have
-- permissive read policies for anonymous users.
GRANT SELECT ON TABLE spf.task_priorities TO anon;
GRANT SELECT ON TABLE spf.task_statuses   TO anon;
GRANT SELECT ON TABLE spf.feature_flags   TO anon;

-- 5. Enable Row Level Security on every table
-- ---------------------------------------------------------------------------
ALTER TABLE spf.tasks              ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.sub_tasks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.task_dependencies  ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.task_priorities    ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.task_statuses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.user_preferences   ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.feature_flags      ENABLE ROW LEVEL SECURITY;

-- 6. RLS policies – only for tables that contain a user_id column
-- ---------------------------------------------------------------------------
-- user_preferences has user_id → enforce auth.uid() = user_id

CREATE POLICY "Users can view own preferences"
  ON spf.user_preferences FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own preferences"
  ON spf.user_preferences FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own preferences"
  ON spf.user_preferences FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete own preferences"
  ON spf.user_preferences FOR DELETE
  USING (auth.uid()::text = user_id);

-- 7. Open-access policies for tables without user_id
-- ---------------------------------------------------------------------------
-- TODO(PHASE-3): Narrow the USING (true) policies below once project ownership
-- is enforced (add a project_id predicate or equivalent ownership check).
-- Track: https://github.com/thefixer3x/sync-plan-flow/issues/60
-- These are intentionally permissive for all authenticated users until
-- project-level isolation is implemented in Phase 3.

DO $$
BEGIN
  RAISE WARNING
    'SPF MIGRATION: spf.tasks, spf.sub_tasks, and spf.task_dependencies have '
    'permissive USING (true) RLS policies open to ALL authenticated users. '
    'These MUST be narrowed in Phase 3 with project ownership predicates. '
    'See TODO(PHASE-3) and https://github.com/thefixer3x/sync-plan-flow/issues/60';
END $$;

-- tasks: open to authenticated users for now
CREATE POLICY "Authenticated users can select tasks"
  ON spf.tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert tasks"
  ON spf.tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update tasks"
  ON spf.tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete tasks"
  ON spf.tasks FOR DELETE TO authenticated USING (true);

-- sub_tasks: open to authenticated users
CREATE POLICY "Authenticated users can select sub_tasks"
  ON spf.sub_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert sub_tasks"
  ON spf.sub_tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update sub_tasks"
  ON spf.sub_tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete sub_tasks"
  ON spf.sub_tasks FOR DELETE TO authenticated USING (true);

-- task_dependencies: open to authenticated users
CREATE POLICY "Authenticated users can select task_dependencies"
  ON spf.task_dependencies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert task_dependencies"
  ON spf.task_dependencies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update task_dependencies"
  ON spf.task_dependencies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete task_dependencies"
  ON spf.task_dependencies FOR DELETE TO authenticated USING (true);

-- task_priorities: read-only reference data (allow select to all)
CREATE POLICY "Anyone can read task_priorities"
  ON spf.task_priorities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role can manage task_priorities"
  ON spf.task_priorities FOR ALL TO service_role USING (true) WITH CHECK (true);

-- task_statuses: read-only reference data (allow select to all)
CREATE POLICY "Anyone can read task_statuses"
  ON spf.task_statuses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role can manage task_statuses"
  ON spf.task_statuses FOR ALL TO service_role USING (true) WITH CHECK (true);

-- feature_flags: readable by all, writable by service_role only
CREATE POLICY "Anyone can read feature_flags"
  ON spf.feature_flags FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role can manage feature_flags"
  ON spf.feature_flags FOR ALL TO service_role USING (true) WITH CHECK (true);
