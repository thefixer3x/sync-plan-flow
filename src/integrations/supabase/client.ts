import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const _missingVars = [
  !SUPABASE_URL && 'VITE_SUPABASE_URL',
  !SUPABASE_PUBLISHABLE_KEY && 'VITE_SUPABASE_PUBLISHABLE_KEY',
].filter(Boolean) as string[];

if (_missingVars.length > 0) {
  throw new Error(
    `Missing Supabase environment variable(s): ${_missingVars.join(', ')}. Ensure they are set in your .env file.`
  );
}

// Base client – use for auth operations (supabase.auth.*)
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Schema-scoped client – use for all data reads/writes in the spf schema
// import { db } from "@/integrations/supabase/client";
// const { data } = await db.from("tasks").select("*");
export const db = supabase.schema("spf");