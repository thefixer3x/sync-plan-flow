import { useCallback, useEffect } from "react";
import { useIDBQuery } from "@/hooks/useIDBQuery";
import {
  DEFAULT_PHASE2_ONBOARDING_PROGRESS,
  db,
  enqueueSyncAction,
  getPhase2OnboardingProgress,
  getFeatureFlags,
  seedPhase2Defaults,
  setFeatureFlag,
  updatePhase2OnboardingProgress,
  type FeatureFlagKey,
  type FeatureFlags,
  type FocusSession,
  type OrchestrationEvent,
  type TriggerRule,
  type Suggestion,
  type ActionLog,
  type SyncQueueItem,
  type SuggestionStatus,
  type Task,
} from "@/store/db";
import {
  buildOrchestrationArtifacts,
  getActivePersonalityId,
  loadMemoryPreferences,
} from "@/lib/phase2/engine";

seedPhase2Defaults().catch(console.error);

const FEATURE_FLAG_DESCRIPTIONS: Record<FeatureFlagKey, string> = {
  calendar_sync: "Prepare calendar integration wiring.",
  email_to_task: "Enable email ingestion scaffolding.",
  automation_builder: "Enable local automation scaffolds.",
  social_sharing: "Enable social sharing surface stubs.",
  advanced_analytics: "Enable advanced analytics modules.",
  cloud_sync: "Optional mirror-write mode to spf schema.",
};

async function mirrorFeatureFlags(flags: FeatureFlags): Promise<boolean> {
  try {
    const { spfDb } = await import("@/integrations/supabase/client");
    const payload = (Object.entries(flags) as [FeatureFlagKey, boolean][])
      .map(([name, enabled]) => ({
        name,
        enabled,
        rollout_pct: enabled ? 100 : 0,
        description: FEATURE_FLAG_DESCRIPTIONS[name],
      }));
    const { error } = await spfDb
      .from("feature_flags")
      .upsert(payload, { onConflict: "name" });
    return !error;
  } catch {
    return false;
  }
}

export function usePhase2Store(tasks: Task[]) {
  useEffect(() => {
    seedPhase2Defaults().catch(console.error);
  }, []);

  const triggerRules = useIDBQuery<TriggerRule[]>(
    () => db.getAll("triggerRules"),
    []
  );

  const orchestrationEvents = useIDBQuery<OrchestrationEvent[]>(
    () => db.getAll("orchestrationEvents"),
    []
  );

  const suggestions = useIDBQuery<Suggestion[]>(
    () => db.getAll("suggestions"),
    []
  );

  const actionLogs = useIDBQuery<ActionLog[]>(
    () => db.getAll("actionLogs"),
    []
  );

  const focusSessions = useIDBQuery<FocusSession[]>(
    () => db.getAll("focusSessions"),
    []
  );

  const syncQueue = useIDBQuery<SyncQueueItem[]>(
    () => db.getAll("syncQueue"),
    []
  );

  const featureFlags = useIDBQuery(() => getFeatureFlags(), null as FeatureFlags | null);
  const onboardingProgress = useIDBQuery(
    () => getPhase2OnboardingProgress(),
    DEFAULT_PHASE2_ONBOARDING_PROGRESS
  );

  const rebuildOrchestration = useCallback(async () => {
    const personalityId = getActivePersonalityId();
    const artifacts = buildOrchestrationArtifacts(tasks, triggerRules, personalityId);

    for (const event of artifacts.events) {
      const existing = await db.get<OrchestrationEvent>("orchestrationEvents", event.id);
      if (!existing) {
        await db.put("orchestrationEvents", event);
      }
    }

    for (const suggestion of artifacts.suggestions) {
      const existing = await db.get<Suggestion>("suggestions", suggestion.id);
      if (!existing) {
        await db.put("suggestions", suggestion);
        continue;
      }
      await db.put("suggestions", {
        ...suggestion,
        status: existing.status,
        createdAt: existing.createdAt,
      });
    }
  }, [tasks, triggerRules]);

  const setSuggestionStatus = useCallback(
    async (suggestionId: string, status: SuggestionStatus) => {
      const existing = await db.get<Suggestion>("suggestions", suggestionId);
      if (!existing) return;

      await db.update("suggestions", suggestionId, { status });
      await db.add("actionLogs", {
        id: crypto.randomUUID(),
        suggestionId,
        outcome: status,
        createdAt: new Date().toISOString(),
        meta: {
          title: existing.title,
          rationale: existing.rationale,
        },
      });

      if (status === "approved" || status === "executed") {
        await enqueueSyncAction("suggestion_action", {
          suggestionId,
          status,
          actions: existing.proposedActions,
        });
      }
    },
    []
  );

  const updateTriggerRule = useCallback(async (ruleId: string, enabled: boolean) => {
    await db.update("triggerRules", ruleId, { enabled });
  }, []);

  const updateFeatureFlag = useCallback(async (key: FeatureFlagKey, enabled: boolean) => {
    const currentFlags = await getFeatureFlags();
    const nextFlags: FeatureFlags = { ...currentFlags, [key]: enabled };

    await setFeatureFlag(key, enabled);

    const shouldMirror = currentFlags.cloud_sync || nextFlags.cloud_sync;
    if (!shouldMirror) return;

    if (key === "cloud_sync" && enabled) {
      await mirrorFeatureFlags(nextFlags);
      return;
    }

    await mirrorFeatureFlags({ ...currentFlags, [key]: enabled });
  }, []);

  const markOnboardingGeneratedPlan = useCallback(async () => {
    await updatePhase2OnboardingProgress({ generatedPlan: true });
  }, []);

  const markOnboardingStartedTimer = useCallback(async () => {
    await updatePhase2OnboardingProgress({ startedTimer: true });
  }, []);

  const dismissOnboarding = useCallback(async () => {
    await updatePhase2OnboardingProgress({ dismissed: true });
  }, []);

  const addFocusSession = useCallback(async (session: FocusSession) => {
    await db.put("focusSessions", session);
  }, []);

  const completeFocusSession = useCallback(async (id: string, status: FocusSession["status"]) => {
    await db.update("focusSessions", id, {
      status,
      endedAt: new Date().toISOString(),
    });
  }, []);

  const queuePendingCount = syncQueue.filter((entry) => entry.status === "pending").length;
  const memoryPreferences = loadMemoryPreferences();

  return {
    orchestrationEvents,
    suggestions,
    actionLogs,
    triggerRules,
    focusSessions,
    syncQueue,
    featureFlags,
    onboardingProgress,
    queuePendingCount,
    memoryPreferences,
    rebuildOrchestration,
    setSuggestionStatus,
    updateTriggerRule,
    updateFeatureFlag,
    addFocusSession,
    completeFocusSession,
    markOnboardingGeneratedPlan,
    markOnboardingStartedTimer,
    dismissOnboarding,
  };
}
