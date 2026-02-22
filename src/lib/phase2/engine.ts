import type {
  ActionLog,
  FocusSession,
  OrchestrationEvent,
  Suggestion,
  Task,
  TriggerRule,
} from "@/store/db";

export interface MemoryPreferences {
  prefersMorningFocus: boolean;
  breakEveryMinutes: number;
  prefersQuickWins: boolean;
  focusCategory: string | null;
  heavyTaskThresholdMinutes: number;
}

export interface TodayPlanItem {
  task: Task;
  estimatedMinutes: number;
  score: number;
  reasons: string[];
  locked: boolean;
}

export interface DailyDigest {
  changedToday: string[];
  whatsDue: string[];
  recommendedFocus: string[];
  pendingBillsTimeline: string[];
}

const MEMORY_PREFS_KEY = "ai-memory-preferences";
const PERSONALITY_KEY = "ai-personality";

const DEFAULT_MEMORY_PREFERENCES: MemoryPreferences = {
  prefersMorningFocus: true,
  breakEveryMinutes: 90,
  prefersQuickWins: true,
  focusCategory: null,
  heavyTaskThresholdMinutes: 90,
};

export function loadMemoryPreferences(): MemoryPreferences {
  try {
    const raw = localStorage.getItem(MEMORY_PREFS_KEY);
    if (!raw) return DEFAULT_MEMORY_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<MemoryPreferences>;
    return {
      ...DEFAULT_MEMORY_PREFERENCES,
      ...parsed,
    };
  } catch {
    return DEFAULT_MEMORY_PREFERENCES;
  }
}

export function getActivePersonalityId(): string {
  return localStorage.getItem(PERSONALITY_KEY) ?? "coach";
}

function estimateMinutes(task: Task): number {
  if (typeof task.estimatedTime === "number" && task.estimatedTime > 0) {
    return Math.round(task.estimatedTime * 60);
  }

  const base = 25;
  const words = task.title.trim().split(/\s+/).length;
  const byLength = Math.min(90, words * 6);
  const byPriority =
    task.priority === "high" ? 25 : task.priority === "medium" ? 10 : 0;
  return Math.max(15, base + byLength + byPriority);
}

function applyPersonalityTone(baseTitle: string, personalityId: string): string {
  switch (personalityId) {
    case "analyst":
      return `Data signal: ${baseTitle}`;
    case "zen":
      return `Mindful nudge: ${baseTitle}`;
    case "friend":
      return `Friendly reminder: ${baseTitle}`;
    case "exec":
      return `Priority action: ${baseTitle}`;
    case "sage":
      return `Strategic focus: ${baseTitle}`;
    case "coach":
    default:
      return `Momentum move: ${baseTitle}`;
  }
}

function isRuleEnabled(rules: TriggerRule[], ruleId: string): boolean {
  const rule = rules.find((entry) => entry.id === ruleId);
  return rule ? rule.enabled : true;
}

function eventFactory(taskId: string, type: OrchestrationEvent["type"], payload: Record<string, unknown>): OrchestrationEvent {
  return {
    id: `${type}:${taskId}`,
    type,
    payload,
    timestamp: new Date().toISOString(),
    source: "tasks",
  };
}

function suggestionFactory(
  event: OrchestrationEvent,
  title: string,
  rationale: string,
  confidence: number,
  personalityId: string
): Suggestion {
  return {
    id: `suggestion:${event.id}`,
    eventId: event.id,
    title: applyPersonalityTone(title, personalityId),
    rationale,
    confidence,
    proposedActions: [
      {
        id: `queue:${event.id}`,
        label: "Queue follow-up",
        type: "queue",
        payload: event.payload,
      },
      {
        id: `focus:${event.id}`,
        label: "Add to focus plan",
        type: "focus",
        payload: event.payload,
      },
      {
        id: `defer:${event.id}`,
        label: "Defer",
        type: "defer",
        payload: event.payload,
      },
    ],
    status: "pending",
    createdAt: new Date().toISOString(),
    personalityTone: personalityId,
  };
}

export function buildOrchestrationArtifacts(
  tasks: Task[],
  rules: TriggerRule[],
  personalityId: string
): { events: OrchestrationEvent[]; suggestions: Suggestion[] } {
  const today = new Date().toISOString().split("T")[0];
  const activeTasks = tasks.filter((task) => task.status !== "completed");
  const events: OrchestrationEvent[] = [];
  const suggestions: Suggestion[] = [];

  for (const task of activeTasks) {
    if (task.dueDate === today && isRuleEnabled(rules, "due-today-rule")) {
      const event = eventFactory(task.id, "due_today", { taskId: task.id, dueDate: task.dueDate });
      events.push(event);
      suggestions.push(
        suggestionFactory(
          event,
          `Task due today: ${task.title}`,
          "This task is due today and should be scheduled in your active focus block.",
          0.9,
          personalityId
        )
      );
    }

    if (task.priority === "high" && isRuleEnabled(rules, "high-priority-rule")) {
      const event = eventFactory(task.id, "high_priority", {
        taskId: task.id,
        priority: task.priority,
      });
      events.push(event);
      suggestions.push(
        suggestionFactory(
          event,
          `High-priority task needs attention: ${task.title}`,
          "The task is marked high priority and remains incomplete.",
          0.84,
          personalityId
        )
      );
    }

    if ((task.blockedByTaskIds?.length ?? 0) > 0 && isRuleEnabled(rules, "blocked-task-rule")) {
      const event = eventFactory(task.id, "blocked", {
        taskId: task.id,
        blockedByTaskIds: task.blockedByTaskIds ?? [],
      });
      events.push(event);
      suggestions.push(
        suggestionFactory(
          event,
          `Unblock task: ${task.title}`,
          "This task depends on another task and is currently blocked.",
          0.8,
          personalityId
        )
      );
    }

    if (typeof task.estimatedTime !== "number" && isRuleEnabled(rules, "missing-estimate-rule")) {
      const estimate = estimateMinutes(task);
      const event = eventFactory(task.id, "missing_estimate", {
        taskId: task.id,
        suggestedMinutes: estimate,
      });
      events.push(event);
      suggestions.push(
        suggestionFactory(
          event,
          `Add estimate for: ${task.title}`,
          `This task has no estimate. Suggested effort: ${estimate} minutes based on local patterns.`,
          0.72,
          personalityId
        )
      );
    }
  }

  return {
    events,
    suggestions,
  };
}

export function generateTodayPlan(
  tasks: Task[],
  budgetHours: number,
  lockedTaskIds: string[],
  preferences: MemoryPreferences
): TodayPlanItem[] {
  const today = new Date().toISOString().split("T")[0];
  const budgetMinutes = Math.max(30, Math.round(budgetHours * 60));

  const candidates = tasks
    .filter((task) => task.status !== "completed")
    .filter((task) => (task.blockedByTaskIds?.length ?? 0) === 0);

  const scored = candidates.map<TodayPlanItem>((task) => {
    const reasons: string[] = [];
    const estimatedMinutes = estimateMinutes(task);
    let score = 0;

    if (task.dueDate === today) {
      score += 45;
      reasons.push("Due today");
    }

    if (task.priority === "high") {
      score += 30;
      reasons.push("High priority");
    }

    if (estimatedMinutes <= 30) {
      score += preferences.prefersQuickWins ? 20 : 8;
      reasons.push("Quick win");
    }

    if (preferences.focusCategory && task.category === preferences.focusCategory) {
      score += 18;
      reasons.push(`Matches ${preferences.focusCategory} focus`);
    }

    if (!task.dueDate) {
      score += 4;
    }

    if (lockedTaskIds.includes(task.id)) {
      score += 100;
      reasons.push("Locked by user");
    }

    return {
      task,
      estimatedMinutes,
      score,
      reasons,
      locked: lockedTaskIds.includes(task.id),
    };
  });

  scored.sort((a, b) => b.score - a.score);

  const selected: TodayPlanItem[] = [];
  let usedMinutes = 0;
  let heavyCount = 0;
  const maxHeavy = Math.max(1, Math.floor(budgetHours / 2));

  for (const candidate of scored) {
    const isHeavy = candidate.estimatedMinutes >= preferences.heavyTaskThresholdMinutes;
    if (isHeavy && heavyCount >= maxHeavy && !candidate.locked) continue;

    const wouldOverflow = usedMinutes + candidate.estimatedMinutes > budgetMinutes;
    if (wouldOverflow && !candidate.locked) continue;

    selected.push(candidate);
    usedMinutes += candidate.estimatedMinutes;
    if (isHeavy) heavyCount += 1;
  }

  return selected;
}

export function buildDailyDigest(
  tasks: Task[],
  plan: TodayPlanItem[],
  sessions: FocusSession[],
  actionLogs: ActionLog[]
): DailyDigest {
  const today = new Date().toISOString().split("T")[0];
  const changedToday = tasks
    .filter((task) => task.completedAt?.startsWith(today))
    .map((task) => `Completed: ${task.title}`);

  const whatsDue = tasks
    .filter((task) => task.status !== "completed" && task.dueDate === today)
    .map((task) => task.title);

  const recommendedFocus = plan.slice(0, 3).map((item) => item.task.title);

  const totalFocusMinutes = sessions
    .filter((session) => session.status === "completed")
    .reduce((sum, session) => sum + session.workMinutes, 0);

  const approvalsToday = actionLogs.filter(
    (log) => log.outcome === "approved" && log.createdAt.startsWith(today)
  ).length;

  return {
    changedToday:
      changedToday.length > 0
        ? changedToday
        : ["No completed tasks yet today."],
    whatsDue: whatsDue.length > 0 ? whatsDue : ["No tasks due today."],
    recommendedFocus:
      recommendedFocus.length > 0
        ? recommendedFocus
        : ["Generate a focus plan to see recommendations."],
    pendingBillsTimeline: [
      "Electricity bill due tomorrow",
      "Subscription renewals due this week",
      `Focus completed: ${totalFocusMinutes} min`,
      `Suggestions approved today: ${approvalsToday}`,
    ],
  };
}
