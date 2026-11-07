// Stores each signed-in user's GitHub access token encrypted on the server and
// performs every GitHub call on their behalf. The browser never keeps the token.
import { z } from "npm:zod@4";
import { json, preflight } from "../_shared/http.ts";
import { adminClient, getUser } from "../_shared/supabaseAdmin.ts";
import { encryptToken } from "../_shared/tokenCrypto.ts";
import { gh, GITHUB_TABLE, loadGithubToken } from "../_shared/github.ts";

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("status") }),
  z.object({ action: z.literal("save"), providerToken: z.string().min(10).max(500) }),
  z.object({ action: z.literal("issues") }),
  z.object({ action: z.literal("disconnect") }),
]);

interface GhUser { login: string; avatar_url: string; html_url: string }
interface GhIssue {
  id: number; number: number; title: string; body: string | null; html_url: string;
  pull_request?: unknown; labels: { name: string }[];
  repository?: { full_name: string };
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const admin = adminClient();
    const user = await getUser(req, admin);
    if (!user) return json({ error: "Sign in required" }, 401);

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return json({ error: "Invalid request", details: parsed.error.flatten() }, 400);
    const body = parsed.data;

    if (body.action === "save") {
      const r = await gh(body.providerToken, "/user");
      if (!r.ok) return json({ error: `GitHub rejected the sign-in (${r.status}). Please connect again.` }, 400);
      const profile = (await r.json()) as GhUser;
      const { error } = await admin.from(GITHUB_TABLE).upsert(
        {
          user_id: user.id,
          token_ciphertext: await encryptToken(body.providerToken),
          github_login: profile.login,
          avatar_url: profile.avatar_url,
          html_url: profile.html_url,
          scopes: r.headers.get("x-oauth-scopes"),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );
      if (error) throw new Error(`Could not save GitHub connection: ${error.message}`);
      return json({ connected: true, user: { login: profile.login, avatar_url: profile.avatar_url, html_url: profile.html_url } });
    }

    if (body.action === "disconnect") {
      const { error } = await admin.from(GITHUB_TABLE).delete().eq("user_id", user.id);
      if (error) throw new Error(`Could not remove GitHub connection: ${error.message}`);
      return json({ connected: false });
    }

    const token = await loadGithubToken(admin, user.id);
    if (!token) return json({ connected: false });

    if (body.action === "status") {
      const r = await gh(token, "/user");
      if (r.status === 401) {
        await admin.from(GITHUB_TABLE).delete().eq("user_id", user.id);
        return json({ connected: false, reconnectRequired: true });
      }
      if (!r.ok) return json({ error: `GitHub returned ${r.status}` }, 502);
      const p = (await r.json()) as GhUser;
      return json({ connected: true, user: { login: p.login, avatar_url: p.avatar_url, html_url: p.html_url } });
    }

    // issues
    const r = await gh(token, "/issues?filter=assigned&state=open&per_page=50");
    if (r.status === 401) {
      await admin.from(GITHUB_TABLE).delete().eq("user_id", user.id);
      return json({ connected: false, reconnectRequired: true });
    }
    if (r.status === 403 && r.headers.get("X-RateLimit-Remaining") === "0") {
      return json({ error: "GitHub rate limit reached — try again later." }, 429);
    }
    if (!r.ok) return json({ error: `GitHub returned ${r.status}`, details: await r.text() }, 502);
    const issues = (await r.json()) as GhIssue[];
    return json({
      connected: true,
      issues: issues.map((i) => ({
        id: i.id,
        number: i.number,
        title: i.title,
        body: i.body?.slice(0, 4000) ?? "",
        url: i.html_url,
        isPullRequest: Boolean(i.pull_request),
        labels: i.labels.map((l) => l.name),
        repo: i.repository?.full_name ?? null,
      })),
    });
  } catch (e) {
    console.error("github-connection failed:", e);
    return json({ error: (e as Error).message }, 500);
  }
});
