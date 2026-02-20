/**
 * useTaskStore – React hook that wraps the Dexie tasks table.
 * Provides full CRUD + computed stats. Auto-seeds on first load.
 */
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "react";
import { db, seedIfEmpty, type Task, type SubTask } from "@/store/db";

// Re-export Task type for backwards-compatibility across the codebase
export type { Task };

// Trigger seeding (idempotent – safe to call many times)
seedIfEmpty().catch(console.error);

export function useTaskStore() {
  const tasks = useLiveQuery(() => db.tasks.toArray(), [], [] as Task[]);

  // ── Write helpers ──────────────────────────────────────────────────────────

  const addTask = useCallback(
    async (taskData: Omit<Task, "id" | "status" | "completedAt">) => {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        status: "todo",
        subTasks: taskData.subTasks ?? [],
        recurrence: taskData.recurrence ?? "none",
      };
      await db.tasks.add(newTask);
    },
    []
  );

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    await db.tasks.update(id, updates);
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await db.tasks.delete(id);
  }, []);

  const toggleComplete = useCallback(async (id: string) => {
    const task = await db.tasks.get(id);
    if (!task) return;
    const isCompleting = task.status !== "completed";
    await db.tasks.update(id, {
      status: isCompleting ? "completed" : "todo",
      completedAt: isCompleting ? new Date().toISOString() : undefined,
    });
  }, []);

  // ── Subtask helpers ────────────────────────────────────────────────────────

  const toggleSubTask = useCallback(
    async (taskId: string, subTaskId: string) => {
      const task = await db.tasks.get(taskId);
      if (!task?.subTasks) return;
      const updated = task.subTasks.map((st) =>
        st.id === subTaskId ? { ...st, done: !st.done } : st
      );
      await db.tasks.update(taskId, { subTasks: updated });
    },
    []
  );

  const addSubTask = useCallback(
    async (taskId: string, title: string) => {
      const task = await db.tasks.get(taskId);
      if (!task) return;
      const newSub: SubTask = { id: crypto.randomUUID(), title, done: false };
      await db.tasks.update(taskId, {
        subTasks: [...(task.subTasks ?? []), newSub],
      });
    },
    []
  );

  // ── Stats ──────────────────────────────────────────────────────────────────

  const today = new Date().toISOString().split("T")[0];
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
    dueToday: tasks.filter((t) => t.dueDate === today).length,
    highPriority: tasks.filter(
      (t) => t.priority === "high" && t.status !== "completed"
    ).length,
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    toggleSubTask,
    addSubTask,
    stats,
  };
}
