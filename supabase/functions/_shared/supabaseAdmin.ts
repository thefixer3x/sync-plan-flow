import { createClient, type SupabaseClient, type User } from "npm:@supabase/supabase-js@2";

/**
 * The lanonasis project has legacy JWT keys disabled, so prefer the new
 * secret key (SUPABASE_SECRET_KEYS is a JSON map injected by the platform)
 * and fall back to the legacy service role key if that is what's available.
 */
function serverKey(): string {
  const raw = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Record<string, string>;
      const key = parsed.default ?? Object.values(parsed)[0];
      if (key) return key;
    } catch {
      // fall through
    }
  }
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!legacy) throw new Error("No Supabase server key is configured for this function.");
  return legacy;
}

export function adminClient(): SupabaseClient {
  return createClient(Deno.env.get("SUPABASE_URL")!, serverKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Verifies the caller's Supabase session token. Returns null when signed out. */
export async function getUser(req: Request, admin: SupabaseClient): Promise<User | null> {
  const header = req.headers.get("Authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  // Publishable keys are not user sessions.
  if (!token || token.startsWith("sb_")) return null;
  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}
