import { useEffect, useMemo, useState } from "react";
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Waypoints,
  XCircle,
} from "lucide-react";
import { useTaskStore } from "@/hooks/useTaskStore";
import { usePhase2Store } from "@/hooks/usePhase2Store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const FEATURE_FLAG_META = [
  { key: "calendar_sync", label: "Calendar Sync", desc: "Prepare calendar integration wiring." },
  { key: "email_to_task", label: "Email to Task", desc: "Enable email ingestion scaffolding." },
  { key: "automation_builder", label: "Automation Builder", desc: "Enable local automation scaffolds." },
  { key: "social_sharing", label: "Social Sharing", desc: "Enable social sharing surface stubs." },
  { key: "advanced_analytics", label: "Advanced Analytics", desc: "Enable advanced analytics modules." },
  { key: "cloud_sync", label: "Cloud Sync", desc: "Optional mirror-write mode to spf schema." },
] as const;

function statusVariant(status: string) {
  if (status === "approved" || status === "executed") return "default" as const;
  if (status === "rejected") return "destructive" as const;
  return "secondary" as const;
}

const Activity = () => {
  const { tasks } = useTaskStore();
  const {
    orchestrationEvents,
    suggestions,
    actionLogs,
    triggerRules,
    syncQueue,
    featureFlags,
    queuePendingCount,
    rebuildOrchestration,
    setSuggestionStatus,
    updateTriggerRule,
    updateFeatureFlag,
  } = usePhase2Store(tasks);

  const [expandedSuggestionId, setExpandedSuggestionId] = useState<string | null>(null);

  useEffect(() => {
    rebuildOrchestration().catch(console.error);
  }, [rebuildOrchestration]);

  const pendingSuggestions = useMemo(
    () => suggestions.filter((entry) => entry.status === "pending"),
    [suggestions]
  );

  const bgSyncSupported = useMemo(() => {
    if (!("serviceWorker" in navigator)) return false;
    const enhancedWindow = window as Window & { SyncManager?: unknown };
    return Boolean(enhancedWindow.SyncManager);
  }, []);

  if (!featureFlags) {
    return (
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading activity feed...
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Waypoints className="h-6 w-6 text-primary" />
            Activity Feed
          </h1>
          <p className="text-sm text-muted-foreground">
            Event → Trigger → Suggestion → Action pipeline (local-first).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => rebuildOrchestration().catch(console.error)}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh Signals
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Feature Flags
            </CardTitle>
            <CardDescription>
              Phase 2 modules are local-first; cloud/integrations remain gated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {FEATURE_FLAG_META.map((flag) => (
              <div key={flag.key} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{flag.label}</p>
                  <p className="text-xs text-muted-foreground">{flag.desc}</p>
                </div>
                <Switch
                  checked={featureFlags[flag.key]}
                  onCheckedChange={(enabled) => updateFeatureFlag(flag.key, enabled)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trigger Rules</CardTitle>
            <CardDescription>Enable/disable local suggestion conditions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {triggerRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-xs text-muted-foreground">{rule.description}</p>
                </div>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(enabled) => updateTriggerRule(rule.id, enabled)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-secondary" />
            Suggestions
          </CardTitle>
          <CardDescription>
            Pending suggestions require explicit approval or rejection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingSuggestions.length === 0 && (
            <p className="text-sm text-muted-foreground">No pending suggestions. You are caught up.</p>
          )}

          {pendingSuggestions.map((suggestion) => {
            const isExpanded = expandedSuggestionId === suggestion.id;
            return (
              <div key={suggestion.id} className="p-3 rounded-lg border space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{suggestion.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={statusVariant(suggestion.status)}>
                        {suggestion.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Confidence: {Math.round(suggestion.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedSuggestionId((prev) =>
                        prev === suggestion.id ? null : suggestion.id
                      )
                    }
                  >
                    Why am I seeing this?
                  </Button>
                </div>

                {isExpanded && (
                  <p className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
                    {suggestion.rationale}
                  </p>
                )}

                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    onClick={() => setSuggestionStatus(suggestion.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setSuggestionStatus(suggestion.id, "rejected")}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSuggestionStatus(suggestion.id, "executed")}
                  >
                    Mark Executed
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ActivityIcon className="h-4 w-4 text-primary" />
              Detected Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[360px] overflow-y-auto">
            {orchestrationEvents.length === 0 && (
              <p className="text-sm text-muted-foreground">No events yet.</p>
            )}
            {orchestrationEvents.map((event) => (
              <div key={event.id} className="p-2 rounded-md border">
                <p className="text-sm font-medium">{event.type.replaceAll("_", " ")}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary" />
              Action Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 max-h-[360px] overflow-y-auto">
            {actionLogs.length === 0 && (
              <p className="text-sm text-muted-foreground">No action decisions logged yet.</p>
            )}
            {actionLogs.map((entry) => (
              <div key={entry.id} className="p-2 rounded-md border flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{entry.outcome}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
                {entry.outcome === "rejected" ? (
                  <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sync Queue Groundwork</CardTitle>
          <CardDescription>
            Intended external actions are queued locally for future integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            Pending queue items: <span className="font-semibold">{queuePendingCount}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Background Sync support: {bgSyncSupported ? "available" : "not available in current runtime"}
          </p>
          {!bgSyncSupported && queuePendingCount > 0 && (
            <p className="text-xs text-muted-foreground">
              Sync pending. Items will remain queued until online processing is available.
            </p>
          )}
          {syncQueue.slice(0, 6).map((item) => (
            <div key={item.id} className="text-xs rounded-md border p-2">
              <span className="font-medium">{item.type}</span> · {item.status} ·{" "}
              {new Date(item.createdAt).toLocaleTimeString()}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
