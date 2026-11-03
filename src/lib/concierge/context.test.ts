import { describe, expect, it } from "vitest";
import { buildConciergeContext, MAX_CONTEXT_TASKS } from "@/lib/concierge/context";
import type { Task } from "@/store/db";

const t = (id: string, over: Partial<Task> = {}): Task => ({
  id, title: id, priority: "medium", status: "todo", category: "Work", ...over,
});
const now = new Date(2026, 10, 3, 13, 0); // 3 Nov 2026

describe("buildConciergeContext", () => {
  it("lists open tasks before completed ones, soonest due first", () => {
    const ctx = buildConciergeContext(
      [t("done", { status: "completed" }), t("later", { dueDate: "2026-11-20" }), t("soon", { dueDate: "2026-11-04" })],
      { page: "/tasks", githubConnected: false, now },
    );
    expect(ctx.tasks.map((x) => x.id)).toEqual(["soon", "later", "done"]);
  });

  it("caps the snapshot at 80 tasks", () => {
    const many = Array.from({ length: 120 }, (_, i) => t(`t${i}`));
    expect(buildConciergeContext(many, { page: "/", githubConnected: false, now }).tasks).toHaveLength(MAX_CONTEXT_TASKS);
    expect(MAX_CONTEXT_TASKS).toBe(80);
  });

  it("counts overdue and due-today open tasks", () => {
    const ctx = buildConciergeContext(
      [t("a", { dueDate: "2026-11-01" }), t("b", { dueDate: "2026-11-03" }), t("c", { dueDate: "2026-11-01", status: "completed" })],
      { page: "/", githubConnected: false, now },
    );
    expect(ctx.stats.overdue).toBe(1);
    expect(ctx.stats.dueToday).toBe(1);
  });
});
