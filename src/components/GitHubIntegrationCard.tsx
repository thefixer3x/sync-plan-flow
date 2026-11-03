import { useCallback, useEffect, useState } from "react";
import { Code, Loader2, RefreshCw, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTaskStore } from "@/hooks/useTaskStore";

// GitHub OAuth runs through Supabase Auth. The GitHub OAuth app
// (client id Ov23liE0fPdgwmxAtAnA) must use the Supabase callback
// https://lanonasis.supabase.co/auth/v1/callback and its secret lives in
// the Supabase dashboard (Auth → Providers → GitHub), never in code.
const TOKEN_KEY = "github_provider_token";
const SCOPES = "read:user repo";

interface GhUser { login: string; avatar_url: string; html_url: string }
interface GhIssue {
  id: number; title: string; body: string | null; html_url: string;
  pull_request?: unknown; labels: { name: string }[];
  repository?: { full_name: string };
}

const gh = (token: string, path: string) =>
  fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });

const GitHubIntegrationCard = () => {
  const { toast } = useToast();
  const { tasks, addTask } = useTaskStore();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<GhUser | null>(null);
  const [busy, setBusy] = useState(false);

  // Capture the provider token right after the OAuth redirect lands.
  useEffect(() => {
    const capture = (t?: string | null) => {
      if (!t) return;
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      if (window.opener && window.opener !== window) {
        window.opener.postMessage({ type: "github-connected" }, window.location.origin);
        window.close();
      }
    };
    supabase.auth.getSession().then(({ data }) => capture(data.session?.provider_token));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => capture(s?.provider_token));
    const onMsg = (e: MessageEvent) => {
      if (e.origin === window.location.origin && e.data?.type === "github-connected") {
        setToken(localStorage.getItem(TOKEN_KEY));
        toast({ title: "Connected to GitHub" });
      }
    };
    window.addEventListener("message", onMsg);
    return () => { sub.subscription.unsubscribe(); window.removeEventListener("message", onMsg); };
  }, [toast]);

  useEffect(() => {
    if (!token) { setUser(null); return; }
    gh(token, "/user").then(async (r) => {
      if (r.status === 401) { localStorage.removeItem(TOKEN_KEY); setToken(null); return; }
      if (r.ok) setUser(await r.json());
    }).catch(() => {});
  }, [token]);

  const connect = async () => {
    // Open the popup synchronously so it isn't blocked; GitHub can't load inside the preview frame.
    const popup = window.open("", "github-oauth", "width=600,height=720");
    setBusy(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const opts = {
        provider: "github" as const,
        options: { scopes: SCOPES, redirectTo: `${window.location.origin}/integrations`, skipBrowserRedirect: true },
      };
      const { data, error } = session
        ? await supabase.auth.linkIdentity(opts)
        : await supabase.auth.signInWithOAuth(opts);
      if (error || !data?.url) throw error ?? new Error("No authorization URL returned");
      if (popup) popup.location.href = data.url;
      else window.location.href = data.url;
    } catch (e) {
      popup?.close();
      toast({ title: "Couldn't start GitHub sign-in", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    toast({ title: "GitHub disconnected" });
  };

  const sync = useCallback(async () => {
    if (!token) return;
    setBusy(true);
    try {
      const r = await gh(token, "/issues?filter=assigned&state=open&per_page=50");
      if (r.status === 403 && r.headers.get("X-RateLimit-Remaining") === "0") throw new Error("GitHub rate limit reached — try again later.");
      if (!r.ok) throw new Error(`GitHub returned ${r.status}`);
      const issues: GhIssue[] = await r.json();
      const existing = new Set((tasks ?? []).map((t) => t.customFields?.githubId).filter(Boolean));
      let added = 0;
      for (const i of issues) {
        if (existing.has(i.id)) continue;
        const labels = i.labels.map((l) => l.name);
        await addTask({
          title: i.title,
          description: `${i.body?.slice(0, 500) ?? ""}\n\n${i.html_url}`.trim(),
          priority: labels.some((l) => /bug|urgent|critical|high/i.test(l)) ? "high" : "medium",
          category: "Development",
          tags: ["github", i.pull_request ? "pull-request" : "issue", ...(i.repository ? [i.repository.full_name] : [])],
          customFields: { githubId: i.id, source: "github", url: i.html_url },
        });
        added++;
      }
      toast({ title: "GitHub synced", description: `${added} new item${added === 1 ? "" : "s"} added to your tasks.` });
    } catch (e) {
      toast({ title: "Sync failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }, [token, tasks, addTask, toast]);

  const synced = (tasks ?? []).filter((t) => t.customFields?.source === "github").length;

  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
              {user ? <img src={user.avatar_url} alt={user.login} className="h-10 w-10" /> : <Code className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-sm">GitHub</CardTitle>
              <Badge variant={token ? "default" : "outline"} className="text-xs mt-0.5">
                {token ? "Live" : "Development"}
              </Badge>
            </div>
          </div>
          {!token && (
            <Button size="sm" onClick={connect} disabled={busy}>
              {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Connect
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-xs">
          {token && user ? (
            <>Connected as <a href={user.html_url} target="_blank" rel="noreferrer" className="font-medium text-primary inline-flex items-center gap-0.5">@{user.login}<ExternalLink className="h-3 w-3" /></a> · {synced} synced item{synced === 1 ? "" : "s"}</>
          ) : "Bring your assigned issues and pull requests into your task board."}
        </CardDescription>
        {token && (
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={sync} disabled={busy}>
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />} Sync now
            </Button>
            <Button size="sm" variant="ghost" onClick={disconnect}><LogOut className="h-3.5 w-3.5" /> Disconnect</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitHubIntegrationCard;
