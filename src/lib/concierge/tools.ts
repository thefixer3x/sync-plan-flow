/**
 * Concierge tools run in the browser because tasks live on this device.
 * The server only describes them to the model; each call lands here.
 */
import { db, type SubTask, type Task } from "@/store/db";

export type ConciergeToolName = "create_task" | "update_task" | "add_subtasks" | "open_page";
export type ToolOutput = { ok: true; summary: string; taskId?: string } | { ok: false; error: string };

const PAGES: Record<string, string> = {
  dashboard: "/dashboard", tasks: "/tasks", focus: "/focus",
  integrations: "/integrations", activity: "/activity", settings: "/settings",
};
const isDate = (v: unknown): v is string => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isTime = (v: unknown): v is string => typeof v === "string" && /^\d{2}:\d{2}$/.test(v);
const isPriority = (v: unknown): v is Task["priority"] => v === "high" || v === "medium" || v === "low";
const str = (v: unknown, max = 300) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);

export async function runConciergeTool(
  name: string,
  input: Record<string, unknown>,
  navigate: (path: string) => void,
): Promise<ToolOutput> {
  switch (name) {
    case "create_task": {
      const title = str(input.title);
      if (!title) return { ok: false, error: "A task needs a title." };
      const task: Task = {
        id: crypto.randomUUID(),
        title,
        description: str(input.description, 2000),
        priority: isPriority(input.priority) ? input.priority : "medium",
        status: "todo",
        category: str(input.category, 60) ?? "Personal",
        dueDate: isDate(input.dueDate) ? input.dueDate : undefined,
        dueTime: isTime(input.dueTime) ? input.dueTime : undefined,
        tags: ["flow"],
        subTasks: [],
        recurrence: "none",
      };
      await db.add("tasks", task);
      return { ok: true, taskId: task.id, summary: `Added “${title}”${task.dueDate ? ` · due ${task.dueDate}` : ""} · ${task.priority}` };
    }
    case "update_task": {
      const id = str(input.taskId, 80);
      const task = id ? await db.get<Task>("tasks", id) : undefined;
      if (!task) return { ok: false, error: "That task isn't on the board any more." };
      const updates: Partial<Task> = {};
      const title = str(input.title);
      if (title) updates.title = title;
      if (isPriority(input.priority)) updates.priority = input.priority;
      if (isDate(input.dueDate)) updates.dueDate = input.dueDate;
      if (input.status === "todo" || input.status === "in-progress" || input.status === "completed") {
        updates.status = input.status;
        updates.completedAt = input.status === "completed" ? new Date().toISOString() : undefined;
      }
      if (Object.keys(updates).length === 0) return { ok: false, error: "Nothing to change." };
      await db.update("tasks", task.id, updates as Record<string, unknown>);
      const bits = [
        updates.status && (updates.status === "completed" ? "marked done" : `moved to ${updates.status}`),
        updates.priority && `priority ${updates.priority}`,
        updates.dueDate && `due ${updates.dueDate}`,
        updates.title && "renamed",
      ].filter(Boolean);
      return { ok: true, taskId: task.id, summary: `“${updates.title ?? task.title}” ${bits.join(", ")}` };
    }
    case "add_subtasks": {
      const id = str(input.taskId, 80);
      const task = id ? await db.get<Task>("tasks", id) : undefined;
      if (!task) return { ok: false, error: "That task isn't on the board any more." };
      const titles = Array.isArray(input.subtasks)
        ? input.subtasks.map((s) => str(s, 200)).filter((s): s is string => Boolean(s)).slice(0, 12)
        : [];
      if (!titles.length) return { ok: false, error: "No steps to add." };
      const added: SubTask[] = titles.map((t) => ({ id: crypto.randomUUID(), title: t, done: false }));
      await db.update("tasks", task.id, { subTasks: [...(task.subTasks ?? []), ...added] });
      return { ok: true, taskId: task.id, summary: `Added ${added.length} step${added.length === 1 ? "" : "s"} to “${task.title}”` };
    }
    case "open_page": {
      const path = typeof input.page === "string" ? PAGES[input.page] : undefined;
      if (!path) return { ok: false, error: "Unknown page." };
      navigate(path);
      return { ok: true, summary: `Opened ${input.page}` };
    }
    default:
      return { ok: false, error: `Unknown action “${name}”.` };
  }
}
