import type { Task } from "@/store/db";

export interface ConciergeContext {
  now: string;
  timezone: string;
  tasks: {
    id: string; title: string; priority: string; status: string;
    dueDate: string | null; dueTime: string | null; category: string;
    subtasks: string; tags: string[];
  }[];
  stats: Record<string, number>;
  githubConnected: boolean;
  page: string;
}

export const MAX_CONTEXT_TASKS = 80;
const PRIORITY_RANK: Record<string, number> = { high: 0, medium: 1, low: 2 };

/**
 * Snapshot of the board the concierge sees on every message. Open tasks come
 * first (by due date, then priority); completed tasks only fill leftover room.
 */
export function buildConciergeContext(
  tasks: Task[],
  opts: { page: string; githubConnected: boolean; now?: Date },
): ConciergeContext {
  const now = opts.now ?? new Date();
  const today = toLocalDate(now);
  const open = tasks.filter((t) => t.status !== "completed");
  const done = tasks.filter((t) => t.status === "completed");

  const sortOpen = [...open].sort((a, b) => {
    const da = a.dueDate ?? "9999-99-99";
    const dbb = b.dueDate ?? "9999-99-99";
    if (da !== dbb) return da < dbb ? -1 : 1;
    return (PRIORITY_RANK[a.priority] ?? 3) - (PRIORITY_RANK[b.priority] ?? 3);
  });
  const recentDone = [...done].sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""));
  const picked = [...sortOpen, ...recentDone].slice(0, MAX_CONTEXT_TASKS);

  return {
    now: now.toLocaleString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) + ` (${today})`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    page: opts.page,
    githubConnected: opts.githubConnected,
    stats: {
      open: open.length,
      completed: done.length,
      overdue: open.filter((t) => t.dueDate && t.dueDate < today).length,
      dueToday: open.filter((t) => t.dueDate === today).length,
      highPriority: open.filter((t) => t.priority === "high").length,
    },
    tasks: picked.map((t) => ({
      id: t.id,
      title: t.title.slice(0, 300),
      priority: t.priority,
      status: t.status,
      dueDate: t.dueDate ?? null,
      dueTime: t.dueTime ?? null,
      category: (t.category || "General").slice(0, 60),
      subtasks: `${(t.subTasks ?? []).filter((s) => s.done).length}/${(t.subTasks ?? []).length}`,
      tags: (t.tags ?? []).slice(0, 15).map((tag) => tag.slice(0, 60)),
    })),
  };
}

export function toLocalDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
