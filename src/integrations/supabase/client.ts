import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';

// This app runs on the "lanonasis" Supabase project (custom domain
// lanonasis.supabase.co → ref mxtsdgkwzjzlttpotole). Its legacy anon key is
// disabled, so we use the project's publishable key. Both values are public
// by design — Row Level Security protects the data.
const SUPABASE_URL = 'https://mxtsdgkwzjzlttpotole.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_A86dhQ3pF30Ztg_DKLxGFA_pyX6pDyK';

export const SUPABASE_FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;
export const SUPABASE_KEY = SUPABASE_PUBLISHABLE_KEY;

// Base client – use for auth operations (supabase.auth.*)
// import { supabase } from "@/integrations/supabase/client";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: brokeredPreviewStorage(),
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Schema-scoped client – use for all data reads/writes in the spf schema
// import { spfDb } from "@/integrations/supabase/client";
// const { data } = await spfDb.from("tasks").select("*");
// @ts-expect-error - spf schema exists in DB but not in generated types
export const spfDb = supabase.schema("spf");
