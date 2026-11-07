-- =============================================================================
-- Migration: Fix app_task_manager grants and RLS policies
-- =============================================================================
-- The app_task_manager schema was bootstrapped with only SELECT RLS policies
-- and NO table-level grants for the PostgREST roles (anon / authenticated /
-- service_role).  As a result, PostgREST cannot serve ANY request against
-- these tables – even the existing SELECT policies have no effect because the
-- role lacks the underlying table privilege.
--
-- This migration:
--   1. Grants USAGE on the schema to authenticated and service_role
--   2. Grants full DML on all tables to authenticated and service_role
--   3. Drops the overly-broad USING (true) SELECT policies and replaces them
--      with appropriately scoped CRUD policies
-- =============================================================================

-- 1. Schema-level usage
-- ---------------------------------------------------------------------------
GRANT USAGE ON SCHEMA app_task_manager TO authenticated, service_role;

-- Default privileges for any tables added to this schema in the future
ALTER DEFAULT PRIVILEGES IN SCHEMA app_task_manager
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated, service_role;

-- 2. Table-level grants
-- ---------------------------------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE app_task_manager.profiles  TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE app_task_manager.users     TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON TABLE app_task_manager.settings  TO authenticated, service_role;

-- 3. profiles – tighten the permissive SELECT policy; add write policies
-- ---------------------------------------------------------------------------
-- Drop the catch-all SELECT that was giving all rows to everyone
DROP POLICY IF EXISTS "Authenticated read access" ON app_task_manager.profiles;

-- Users can only see and manage their own profile row
CREATE POLICY "Users can view own profile"
  ON app_task_manager.profiles FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own profile"
  ON app_task_manager.profiles FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own profile"
  ON app_task_manager.profiles FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own profile"
  ON app_task_manager.profiles FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- service_role bypass
CREATE POLICY "Service role can manage profiles"
  ON app_task_manager.profiles FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- 4. users – keep reads open for authenticated; service_role manages all
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated read access" ON app_task_manager.users;

CREATE POLICY "Authenticated users can view app users"
  ON app_task_manager.users FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can register in app"
  ON app_task_manager.users FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Service role can manage app users"
  ON app_task_manager.users FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- 5. settings – read-only for authenticated; service_role writes
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated read access" ON app_task_manager.settings;

CREATE POLICY "Authenticated users can read app settings"
  ON app_task_manager.settings FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role can manage app settings"
  ON app_task_manager.settings FOR ALL TO service_role
  USING (true) WITH CHECK (true);
