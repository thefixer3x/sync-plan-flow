/**
 * useTaskStore – React hook wrapping the IDB tasks store.
 * Provides full CRUD + computed stats. Auto-seeds on first load.
 */
import { useCallback } from "react";
import { useIDBQuery } from "@/hooks/useIDBQuery";
import { db, seedIfEmpty, type Task, type SubTask } from "@/store/db";

// Re-export Task type for backwards-compatibility
export type { Task };

// Trigger seeding (idempotent)
seedIfEmpty().catch(console.error);

export function useTaskStore() {
  const tasks = useIDBQuery<Task[]>(() => db.getAll("tasks"), []);

  const addTask = useCallback(
    async (taskData: Omit<Task, "id" | "status" | "completedAt">) => {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        status: "todo",
        subTasks: taskData.subTasks ?? [],
        recurrence: taskData.recurrence ?? "none",
      };
      await db.add("tasks", newTask);
    },
    []
  );

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    await db.update("tasks", id, updates as Record<string, unknown>);
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await db.delete("tasks", id);
  }, []);

  const toggleComplete = useCallback(async (id: string) => {
    const task = await db.get<Task>("tasks", id);
    if (!task) return;
    const isCompleting = task.status !== "completed";
    await db.update("tasks", id, {
      status: isCompleting ? "completed" : "todo",
      completedAt: isCompleting ? new Date().toISOString() : undefined,
    });
  }, []);

  const toggleSubTask = useCallback(
    async (taskId: string, subTaskId: string) => {
      const task = await db.get<Task>("tasks", taskId);
      if (!task?.subTasks) return;
      const updated = task.subTasks.map((st) =>
        st.id === subTaskId ? { ...st, done: !st.done } : st
      );
      await db.update("tasks", taskId, { subTasks: updated });
    },
    []
  );

  const addSubTask = useCallback(
    async (taskId: string, title: string) => {
      const task = await db.get<Task>("tasks", taskId);
      if (!task) return;
      const newSub: SubTask = { id: crypto.randomUUID(), title, done: false };
      await db.update("tasks", taskId, {
        subTasks: [...(task.subTasks ?? []), newSub],
      });
    },
    []
  );

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
