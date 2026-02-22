/**
 * Unified Dexie (IndexedDB) store – single source of truth.
 * Schema is versioned so old data never breaks.
 */
import Dexie, { type Table } from "dexie";

export interface SubTask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate?: string;
  dueTime?: string;
  category: string;
  tags?: string[];
  assignee?: string;
  estimatedTime?: number;
  completedAt?: string;
  // Phase 1 extensions
  subTasks?: SubTask[];
  recurrence?: "none" | "daily" | "weekly" | "monthly";
  nextDueDate?: string;
  blockedByTaskIds?: string[];
  customFields?: Record<string, string | number | boolean>;
}

export interface OrchestrationEvent {
  id: string;
  type: "due_today" | "high_priority" | "blocked" | "missing_estimate" | "focus_recommendation";
  payload: Record<string, unknown>;
  timestamp: string;
  source: "tasks" | "focus" | "system";
}

export interface TriggerRule {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  conditions: string[];
}

export interface SuggestionAction {
  id: string;
  label: string;
  type: "queue" | "focus" | "defer";
  payload?: Record<string, unknown>;
}

export type SuggestionStatus = "pending" | "approved" | "rejected" | "executed";

export interface Suggestion {
  id: string;
  eventId: string;
  title: string;
  rationale: string;
  confidence: number;
  proposedActions: SuggestionAction[];
  status: SuggestionStatus;
  createdAt: string;
  personalityTone: string;
}

export interface ActionLog {
  id: string;
  suggestionId: string;
  outcome: SuggestionStatus;
  createdAt: string;
  meta?: Record<string, unknown>;
}

export interface FocusSession {
  id: string;
  startedAt: string;
  endedAt?: string;
  workMinutes: number;
  breakMinutes: number;
  status: "running" | "completed" | "cancelled";
  taskIds: string[];
}

export interface SyncQueueItem {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: "pending" | "processed" | "failed";
  createdAt: string;
}

export type FeatureFlagKey =
  | "calendar_sync"
  | "email_to_task"
  | "automation_builder"
  | "social_sharing"
  | "advanced_analytics"
  | "cloud_sync";

export type FeatureFlags = Record<FeatureFlagKey, boolean>;

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  calendar_sync: false,
  email_to_task: false,
  automation_builder: false,
  social_sharing: false,
  advanced_analytics: false,
  cloud_sync: false,
};

export interface Phase2OnboardingProgress {
  generatedPlan: boolean;
  startedTimer: boolean;
  dismissed: boolean;
  completedAt?: string;
}

export const DEFAULT_PHASE2_ONBOARDING_PROGRESS: Phase2OnboardingProgress = {
  generatedPlan: false,
  startedTimer: false,
  dismissed: false,
};

export interface AppSettings {
  key: string;
  value: unknown;
}

class AppDB extends Dexie {
  tasks!: Table<Task, string>;
  settings!: Table<AppSettings, string>;
  orchestrationEvents!: Table<OrchestrationEvent, string>;
  triggerRules!: Table<TriggerRule, string>;
  suggestions!: Table<Suggestion, string>;
  actionLogs!: Table<ActionLog, string>;
  focusSessions!: Table<FocusSession, string>;
  syncQueue!: Table<SyncQueueItem, string>;

  constructor() {
    super("ai-productivity-db");

    this.version(1).stores({
      tasks: "id, status, priority, category, dueDate",
      settings: "key",
    });

    this.version(2).stores({
      tasks: "id, status, priority, category, dueDate",
      settings: "key",
      orchestrationEvents: "id, type, timestamp, source",
      triggerRules: "id, enabled",
      suggestions: "id, status, createdAt, confidence",
      actionLogs: "id, suggestionId, outcome, createdAt",
      focusSessions: "id, startedAt, status",
      syncQueue: "id, status, createdAt, type",
    });
  }
}

export const db = new AppDB();

// ── Default seed tasks (only inserted once) ──────────────────────────────────
const SEED_KEY = "tasks-seeded-v1";
const PHASE2_SEED_KEY = "phase2-seeded-v1";
const FEATURE_FLAGS_KEY = "feature-flags-v1";
const PHASE2_ONBOARDING_KEY = "phase2-onboarding-v1";

export async function seedIfEmpty() {
  const alreadySeeded = await db.settings.get(SEED_KEY);
  if (alreadySeeded) return;

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const in2days = new Date(Date.now() + 172800000).toISOString().split("T")[0];

  const seeds: Task[] = [
    {
      id: "seed-1",
      title: "Review project proposal",
      description: "Go through the Q1 project proposal and add feedback",
      priority: "high",
      status: "todo",
      dueDate: today,
      category: "Work",
      estimatedTime: 2,
      subTasks: [
        { id: "s1", title: "Read executive summary", done: true },
        { id: "s2", title: "Add inline comments", done: false },
        { id: "s3", title: "Send feedback email", done: false },
      ],
    },
    {
      id: "seed-2",
      title: "Grocery shopping",
      description: "Weekly groceries – check the fridge first",
      priority: "medium",
      status: "todo",
      dueDate: tomorrow,
      category: "Personal",
      estimatedTime: 1,
    },
    {
      id: "seed-3",
      title: "Morning run",
      description: "30-minute jog around the park",
      priority: "low",
      status: "in-progress",
      category: "Health",
      estimatedTime: 0.5,
      recurrence: "daily",
    },
    {
      id: "seed-4",
      title: "Update LinkedIn profile",
      priority: "low",
      status: "completed",
      category: "Personal",
      completedAt: new Date().toISOString(),
    },
    {
      id: "seed-5",
      title: "Client presentation prep",
      description: "Prepare slides and talking points for Friday",
      priority: "high",
      status: "in-progress",
      dueDate: in2days,
      category: "Work",
      estimatedTime: 3,
      blockedByTaskIds: ["seed-1"],
    },
  ];

  await db.tasks.bulkAdd(seeds);
  await db.settings.put({ key: SEED_KEY, value: true });
}

// ── Settings helpers ──────────────────────────────────────────────────────────
export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await db.settings.get(key);
  return row ? (row.value as T) : fallback;
}

export async function setSetting<T>(key: string, value: T): Promise<void> {
  await db.settings.put({ key, value });
}

export async function getFeatureFlags(): Promise<FeatureFlags> {
  const stored = await getSetting<Partial<FeatureFlags>>(FEATURE_FLAGS_KEY, {});
  return {
    ...DEFAULT_FEATURE_FLAGS,
    ...stored,
  };
}

export async function setFeatureFlag(key: FeatureFlagKey, enabled: boolean): Promise<void> {
  const flags = await getFeatureFlags();
  await setSetting(FEATURE_FLAGS_KEY, { ...flags, [key]: enabled });
}

export async function getPhase2OnboardingProgress(): Promise<Phase2OnboardingProgress> {
  const stored = await getSetting<Partial<Phase2OnboardingProgress>>(PHASE2_ONBOARDING_KEY, {});
  return {
    ...DEFAULT_PHASE2_ONBOARDING_PROGRESS,
    ...stored,
  };
}

export async function updatePhase2OnboardingProgress(
  updates: Partial<Phase2OnboardingProgress>
): Promise<Phase2OnboardingProgress> {
  const current = await getPhase2OnboardingProgress();
  const next = { ...current, ...updates };
  if (next.generatedPlan && next.startedTimer && !next.completedAt) {
    next.completedAt = new Date().toISOString();
  }
  await setSetting(PHASE2_ONBOARDING_KEY, next);
  return next;
}

export async function enqueueSyncAction(
  type: string,
  payload: Record<string, unknown>
): Promise<void> {
  await db.syncQueue.add({
    id: crypto.randomUUID(),
    type,
    payload,
    status: "pending",
    createdAt: new Date().toISOString(),
  });
}

export async function markSyncQueueItem(
  id: string,
  status: SyncQueueItem["status"]
): Promise<void> {
  await db.syncQueue.update(id, { status });
}

export async function seedPhase2Defaults(): Promise<void> {
  const alreadySeeded = await db.settings.get(PHASE2_SEED_KEY);
  if (alreadySeeded) return;

  const rules: TriggerRule[] = [
    {
      id: "due-today-rule",
      name: "Due Today",
      enabled: true,
      description: "Create suggestions for tasks due today.",
      conditions: ["task.dueDate === today", "task.status !== completed"],
    },
    {
      id: "high-priority-rule",
      name: "High Priority",
      enabled: true,
      description: "Create suggestions for unresolved high priority tasks.",
      conditions: ["task.priority === high", "task.status !== completed"],
    },
    {
      id: "blocked-task-rule",
      name: "Blocked Task",
      enabled: true,
      description: "Suggest unblocking actions for blocked tasks.",
      conditions: ["task.blockedByTaskIds.length > 0", "task.status !== completed"],
    },
    {
      id: "missing-estimate-rule",
      name: "Missing Estimate",
      enabled: true,
      description: "Estimate effort for tasks without estimated time.",
      conditions: ["task.estimatedTime is undefined", "task.status !== completed"],
    },
  ];

  await db.triggerRules.bulkPut(rules);
  await setSetting(FEATURE_FLAGS_KEY, DEFAULT_FEATURE_FLAGS);
  await setSetting(PHASE2_ONBOARDING_KEY, DEFAULT_PHASE2_ONBOARDING_PROGRESS);
  await db.settings.put({ key: PHASE2_SEED_KEY, value: true });
}
