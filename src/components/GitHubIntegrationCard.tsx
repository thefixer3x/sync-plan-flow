import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Code, Loader2, RefreshCw, LogOut, ExternalLink, Wand2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTaskStore } from "@/hooks/useTaskStore";
import { useAuth } from "@/contexts/AuthContext";
import { callFunction } from "@/lib/edgeFunctions";
import { GITHUB_CONNECTED_EVENT, startGithubOAuth } from "@/lib/githubAuth";
import { IssueBreakdownDialog } from "@/components/IssueBreakdownDialog";

interface GhUser { login: string; avatar_url: string; html_url: string }
interface SyncedIssue {
  id: number; number: number; title: string; body: string; url: string;
  isPullRequest: boolean; labels: string[]; repo: string | null;
}
type Status = { connected: boolean; user?: GhUser; reconnectRequired?: boolean };

const GitHubIntegrationCard = () => {
  const { toast } = useToast();
  const { user: appUser, loading: authLoading } = useAuth();
  const { tasks, addTask } = useTaskStore();
  const [status, setStatus] = useState<Status | null>(null);
  const [busy, setBusy] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const refresh = useCallback(async () => {
    if (!appUser) { setStatus({ connected: false }); return; }
    try {
      setStatus(await callFunction<Status>("github-connection", { action: "status" }));
    } catch (e) {
      setStatus({ connected: false });
      toast({ title: "Couldn't check GitHub", description: (e as Error).message, variant: "destructive" });
    }
  }, [appUser, toast]);

  useEffect(() => { if (!authLoading) void refresh(); }, [authLoading, refresh]);
  useEffect(() => {
    const on = () => void refresh();
    window.addEventListener(GITHUB_CONNECTED_EVENT, on);
    return () => window.removeEventListener(GITHUB_CONNECTED_EVENT, on);
  }, [refresh]);

  const connect = async () => {
    try {
      await startGithubOAuth("/integrations");
    } catch (e) {
      toast({ title: "Couldn't start GitHub sign-in", description: (e as Error).message, variant: "destructive" });
    }
  };

  const disconnect = async () => {
    setBusy(true);
    try {
      await callFunction("github-connection", { action: "disconnect" });
      setStatus({ connected: false });
      toast({ title: "GitHub disconnected", description: "Your access key was deleted from our servers." });
    } catch (e) {
      toast({ title: "Couldn't disconnect", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const sync = async () => {
    setBusy(true);
    try {
      const res = await callFunction<{ connected: boolean; reconnectRequired?: boolean; issues?: SyncedIssue[] }>(
        "github-connection", { action: "issues" },
      );
      if (!res.connected) { setStatus(res); return; }
      const existing = new Set(tasks.map((t) => t.customFields?.githubId).filter(Boolean));
      let added = 0;
      for (const i of res.issues ?? []) {
        if (existing.has(i.id)) continue;
        await addTask({
          title: i.title,
          description: `${i.body.slice(0, 1500)}\n\n${i.url}`.trim(),
          priority: i.labels.some((l) => /bug|urgent|critical|high/i.test(l)) ? "high" : "medium",
          category: "Development",
          tags: ["github", i.isPullRequest ? "pull-request" : "issue", ...(i.repo ? [i.repo] : [])],
          customFields: { githubId: i.id, source: "github", url: i.url, labels: i.labels.join(",") },
        });
        added++;
      }
      toast({ title: "GitHub synced", description: `${added} new item${added === 1 ? "" : "s"} added to your tasks.` });
    } catch (e) {
      toast({ title: "Sync failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const connected = status?.connected;
  const gh = status?.user;
  const synced = tasks.filter((t) => t.customFields?.source === "github").length;

  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
              {gh ? <img src={gh.avatar_url} alt={gh.login} className="h-10 w-10" /> : <Code className="h-5 w-5 text-primary" />}
            </div>
            <div>
              <CardTitle className="text-sm">GitHub</CardTitle>
              <Badge variant={connected ? "default" : "outline"} className="text-xs mt-0.5">
                {status === null ? "Checking…" : connected ? "Live" : "Development"}
              </Badge>
            </div>
          </div>
          {status !== null && !connected && (
            <Button size="sm" onClick={connect}>
              {status.reconnectRequired ? "Reconnect" : "Connect"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="text-xs">
          {connected && gh ? (
            <>Connected as <a href={gh.html_url} target="_blank" rel="noreferrer" className="font-medium text-primary inline-flex items-center gap-0.5">@{gh.login}<ExternalLink className="h-3 w-3" /></a> · {synced} synced item{synced === 1 ? "" : "s"}</>
          ) : status?.reconnectRequired ? (
            "Your GitHub access needs to be renewed."
          ) : !appUser && !authLoading ? (
            <>Connecting signs you in with GitHub. Prefer email? <Link to="/auth?next=/integrations" className="text-primary font-medium">Sign in first</Link>.</>
          ) : (
            "Bring your assigned issues and pull requests into your task board."
          )}
        </CardDescription>
        {connected && (
          <>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={sync} disabled={busy}>
                {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />} Sync now
              </Button>
              <Button size="sm" variant="outline" onClick={() => setBreakdownOpen(true)} disabled={synced === 0}>
                <Wand2 className="h-3.5 w-3.5" /> Break down an issue
              </Button>
              <Button size="sm" variant="ghost" onClick={disconnect} disabled={busy}><LogOut className="h-3.5 w-3.5" /> Disconnect</Button>
            </div>
            <p className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Your GitHub key is stored encrypted on our server — works on any device you sign in on.
            </p>
          </>
        )}
      </CardContent>
      <IssueBreakdownDialog open={breakdownOpen} onOpenChange={setBreakdownOpen} />
    </Card>
  );
};

export default GitHubIntegrationCard;
