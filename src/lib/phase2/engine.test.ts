import { buildDailyDigest, buildOrchestrationArtifacts, generateTodayPlan } from "@/lib/phase2/engine";
import type { Task, TriggerRule } from "@/store/db";

const rules: TriggerRule[] = [
  {
    id: "due-today-rule",
    name: "Due Today",
    enabled: true,
    description: "",
    conditions: [],
  },
  {
    id: "high-priority-rule",
    name: "High Priority",
    enabled: true,
    description: "",
    conditions: [],
  },
  {
    id: "blocked-task-rule",
    name: "Blocked",
    enabled: true,
    description: "",
    conditions: [],
  },
  {
    id: "missing-estimate-rule",
    name: "Missing estimate",
    enabled: true,
    description: "",
    conditions: [],
  },
];

const today = new Date().toISOString().split("T")[0];

const tasks: Task[] = [
  {
    id: "t1",
    title: "Ship release notes",
    priority: "high",
    status: "todo",
    dueDate: today,
    category: "Work",
  },
  {
    id: "t2",
    title: "Blocked dependency task",
    priority: "medium",
    status: "todo",
    category: "Work",
    blockedByTaskIds: ["t1"],
  },
  {
    id: "t3",
    title: "Quick clean-up",
    priority: "low",
    status: "todo",
    category: "Personal",
    estimatedTime: 0.25,
  },
];

describe("phase2 engine", () => {
  it("builds orchestration events and personality-toned suggestions", () => {
    const { events, suggestions } = buildOrchestrationArtifacts(tasks, rules, "analyst");
    expect(events.length).toBeGreaterThan(0);
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions.every((entry) => entry.status === "pending")).toBe(true);
    expect(suggestions.some((entry) => entry.title.startsWith("Data signal:"))).toBe(true);
  });

  it("generates a today plan with blocked tasks excluded and locked tasks preserved", () => {
    const plan = generateTodayPlan(
      tasks,
      2,
      ["t3"],
      {
        prefersMorningFocus: true,
        breakEveryMinutes: 90,
        prefersQuickWins: true,
        focusCategory: null,
        heavyTaskThresholdMinutes: 90,
      }
    );
    expect(plan.some((item) => item.task.id === "t2")).toBe(false);
    expect(plan.some((item) => item.task.id === "t3")).toBe(true);
  });

  it("builds digest summaries from local-only inputs", () => {
    const plan = generateTodayPlan(
      tasks,
      2,
      [],
      {
        prefersMorningFocus: true,
        breakEveryMinutes: 90,
        prefersQuickWins: true,
        focusCategory: null,
        heavyTaskThresholdMinutes: 90,
      }
    );

    const digest = buildDailyDigest(tasks, plan, [], []);
    expect(digest.whatsDue.length).toBeGreaterThan(0);
    expect(digest.recommendedFocus.length).toBeGreaterThan(0);
    expect(digest.pendingBillsTimeline.length).toBeGreaterThan(0);
  });
});
