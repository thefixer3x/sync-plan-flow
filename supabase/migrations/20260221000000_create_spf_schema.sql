-- =============================================================================
-- Migration: Create isolated "spf" schema for Sync Plan Flow
-- =============================================================================
-- This migration creates a dedicated Postgres schema so this app's tables
-- live completely separate from every other schema on this shared Supabase
-- instance.  Tables are defined from scratch using explicit DDL that matches
-- the proven structure in control_room (the authoritative task-management
-- schema on this DB).
--
-- DO NOT use LIKE public.<table> – the task/preference tables do not live
-- in the public schema for this project; attempting to clone them would
-- cause the migration to fail immediately.
--
-- IMPORTANT: After running this migration you must also expose the schema
-- via the Supabase Dashboard:
--   Settings -> API -> Exposed schemas -> add "spf"
-- Otherwise PostgREST will not serve it and client queries will 404.
-- =============================================================================

-- 1. Create the schema
-- ---------------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS spf;
COMMENT ON SCHEMA spf IS 'Sync Plan Flow – isolated task-management schema';

-- 2. Grant USAGE so PostgREST roles can resolve the schema
-- ---------------------------------------------------------------------------
-- anon gets USAGE so PostgREST can read the schema; table-level grants for
-- anon are restricted to SELECT on reference tables only (see section 7).
GRANT USAGE ON SCHEMA spf TO anon, authenticated, service_role;

-- Default privileges for any tables/sequences created in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA spf
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA spf
  GRANT USAGE, SELECT ON SEQUENCES TO authenticated, service_role;

-- 3. Reference / lookup tables
-- ---------------------------------------------------------------------------
CREATE TABLE spf.task_priorities (
  id          SERIAL      PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT
);
COMMENT ON TABLE spf.task_priorities
  IS 'Task priority levels – reference data (Low / Medium / High / Critical)';

CREATE TABLE spf.task_statuses (
  id          SERIAL      PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT
);
COMMENT ON TABLE spf.task_statuses
  IS 'Task workflow statuses – reference data (Backlog / Todo / In Progress / Done …)';

-- Seed sensible defaults so the app works without a separate seed step
INSERT INTO spf.task_priorities (name, description) VALUES
  ('Low',      'Non-urgent; can be scheduled later'),
  ('Medium',   'Standard priority'),
  ('High',     'Important; requires timely attention'),
  ('Critical', 'Blocking; requires immediate action')
ON CONFLICT DO NOTHING;

INSERT INTO spf.task_statuses (name, description) VALUES
  ('Backlog',     'Captured but not yet scheduled'),
  ('Todo',        'Ready to be worked on'),
  ('In Progress', 'Actively being worked on'),
  ('In Review',   'Awaiting review or approval'),
  ('Done',        'Completed'),
  ('Cancelled',   'No longer relevant')
ON CONFLICT DO NOTHING;

-- 4. App-level feature flags
-- ---------------------------------------------------------------------------
CREATE TABLE spf.feature_flags (
  name        TEXT        PRIMARY KEY,
  enabled     BOOLEAN     NOT NULL DEFAULT false,
  rollout_pct INTEGER     NOT NULL DEFAULT 0
                CHECK (rollout_pct BETWEEN 0 AND 100),
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE spf.feature_flags
  IS 'App-level feature flags for Sync Plan Flow';

-- 5. Core task tables
-- ---------------------------------------------------------------------------
CREATE TABLE spf.tasks (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL,
  description TEXT,
  project_id  UUID,                           -- future: FK to a projects table
  status_id   INTEGER     REFERENCES spf.task_statuses(id)   ON DELETE SET NULL,
  priority_id INTEGER     REFERENCES spf.task_priorities(id) ON DELETE SET NULL,
  assignee_id UUID        REFERENCES auth.users(id)          ON DELETE SET NULL,
  due_date    TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE spf.tasks IS 'Tasks managed by the Sync Plan Flow app';

CREATE TABLE spf.sub_tasks (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id     UUID        REFERENCES spf.tasks(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  completed   BOOLEAN     NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
COMMENT ON TABLE spf.sub_tasks IS 'Sub-tasks that belong to a spf.tasks row';

CREATE TABLE spf.task_dependencies (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id            UUID REFERENCES spf.tasks(id) ON DELETE CASCADE,
  depends_on_task_id UUID REFERENCES spf.tasks(id) ON DELETE CASCADE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT spf_no_self_dependency CHECK (task_id <> depends_on_task_id)
);
COMMENT ON TABLE spf.task_dependencies
  IS 'Directed dependency edges: task_id is blocked by depends_on_task_id';

-- 6. Performance indexes
-- ---------------------------------------------------------------------------
CREATE INDEX idx_spf_tasks_project_id   ON spf.tasks(project_id);
CREATE INDEX idx_spf_tasks_assignee_id  ON spf.tasks(assignee_id);
CREATE INDEX idx_spf_tasks_status_id    ON spf.tasks(status_id);
CREATE INDEX idx_spf_tasks_priority_id  ON spf.tasks(priority_id);
CREATE INDEX idx_spf_tasks_created_at   ON spf.tasks(created_at DESC);
CREATE INDEX idx_spf_sub_tasks_task_id  ON spf.sub_tasks(task_id);
CREATE INDEX idx_spf_deps_task_id       ON spf.task_dependencies(task_id);
CREATE INDEX idx_spf_deps_depends_on    ON spf.task_dependencies(depends_on_task_id);

-- updated_at trigger
CREATE OR REPLACE FUNCTION spf.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON spf.tasks
  FOR EACH ROW EXECUTE FUNCTION spf.set_updated_at();

CREATE TRIGGER trg_feature_flags_updated_at
  BEFORE UPDATE ON spf.feature_flags
  FOR EACH ROW EXECUTE FUNCTION spf.set_updated_at();

-- 7. Grant explicit table-level permissions
-- ---------------------------------------------------------------------------
-- authenticated and service_role: full DML on all tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA spf
  TO authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA spf
  TO authenticated, service_role;

-- anon: SELECT-only on the reference/read-only tables that carry public data
GRANT SELECT ON TABLE spf.task_priorities TO anon;
GRANT SELECT ON TABLE spf.task_statuses   TO anon;
GRANT SELECT ON TABLE spf.feature_flags   TO anon;

-- 8. Enable Row Level Security on every table
-- ---------------------------------------------------------------------------
ALTER TABLE spf.tasks              ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.sub_tasks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.task_dependencies  ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.task_priorities    ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.task_statuses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE spf.feature_flags      ENABLE ROW LEVEL SECURITY;

-- 9. RLS policies – reference tables (read-only public data)
-- ---------------------------------------------------------------------------
CREATE POLICY "Anyone can read task_priorities"
  ON spf.task_priorities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role can manage task_priorities"
  ON spf.task_priorities FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read task_statuses"
  ON spf.task_statuses FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role can manage task_statuses"
  ON spf.task_statuses FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read feature_flags"
  ON spf.feature_flags FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Service role can manage feature_flags"
  ON spf.feature_flags FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 10. RLS policies – task tables (open to authenticated; Phase 3 will narrow)
-- ---------------------------------------------------------------------------
-- TODO(PHASE-3): Replace USING (true) policies below with project ownership
-- predicates once project_id is properly enforced.
-- Track: https://github.com/thefixer3x/sync-plan-flow/issues/60

DO $$
BEGIN
  RAISE WARNING
    'SPF MIGRATION: spf.tasks, spf.sub_tasks, and spf.task_dependencies have '
    'permissive USING (true) RLS policies open to ALL authenticated users. '
    'These MUST be narrowed in Phase 3 with project ownership predicates. '
    'See TODO(PHASE-3) and https://github.com/thefixer3x/sync-plan-flow/issues/60';
END $$;

-- tasks
CREATE POLICY "Authenticated users can select tasks"
  ON spf.tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert tasks"
  ON spf.tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update tasks"
  ON spf.tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete tasks"
  ON spf.tasks FOR DELETE TO authenticated USING (true);

-- sub_tasks
CREATE POLICY "Authenticated users can select sub_tasks"
  ON spf.sub_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert sub_tasks"
  ON spf.sub_tasks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update sub_tasks"
  ON spf.sub_tasks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete sub_tasks"
  ON spf.sub_tasks FOR DELETE TO authenticated USING (true);

-- task_dependencies
CREATE POLICY "Authenticated users can select task_dependencies"
  ON spf.task_dependencies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert task_dependencies"
  ON spf.task_dependencies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update task_dependencies"
  ON spf.task_dependencies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete task_dependencies"
  ON spf.task_dependencies FOR DELETE TO authenticated USING (true);
