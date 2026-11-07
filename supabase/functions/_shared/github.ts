import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { decryptToken } from "./tokenCrypto.ts";

export const GITHUB_TABLE = "spf_github_connections";

export const gh = (token: string, path: string, init?: RequestInit) =>
  fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "sync-plan-flow",
      ...(init?.headers ?? {}),
    },
  });

/** Loads and decrypts the signed-in user's stored GitHub token, or null. */
export async function loadGithubToken(admin: SupabaseClient, userId: string): Promise<string | null> {
  const { data, error } = await admin
    .from(GITHUB_TABLE)
    .select("token_ciphertext")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`Could not read GitHub connection: ${error.message}`);
  return data ? await decryptToken(data.token_ciphertext as string) : null;
}
