import { useState, useEffect, useCallback } from "react";
import { Task } from "@/components/TaskCard";

const STORAGE_KEY = "ai-productivity-tasks";

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Review project proposal",
    description: "Go through the Q1 project proposal and add feedback",
    priority: "high",
    status: "todo",
    dueDate: new Date().toISOString().split("T")[0],
    category: "Work",
    estimatedTime: 2,
  },
  {
    id: "2",
    title: "Grocery shopping",
    description: "Weekly groceries - check the fridge first",
    priority: "medium",
    status: "todo",
    dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    category: "Personal",
    estimatedTime: 1,
  },
  {
    id: "3",
    title: "Morning run",
    description: "30 minute jog around the park",
    priority: "low",
    status: "in-progress",
    category: "Health",
    estimatedTime: 0.5,
  },
  {
    id: "4",
    title: "Update LinkedIn profile",
    priority: "low",
    status: "completed",
    category: "Personal",
    completedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Client presentation prep",
    description: "Prepare slides and talking points for Friday",
    priority: "high",
    status: "in-progress",
    dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    category: "Work",
    estimatedTime: 3,
  },
];

function loadTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return defaultTasks;
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, "id" | "status" | "completedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      status: "todo",
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const isCompleting = t.status !== "completed";
        return {
          ...t,
          status: isCompleting ? "completed" as const : "todo" as const,
          completedAt: isCompleting ? new Date().toISOString() : undefined,
        };
      })
    );
  }, []);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
    dueToday: tasks.filter((t) => {
      if (!t.dueDate) return false;
      return t.dueDate === new Date().toISOString().split("T")[0];
    }).length,
    highPriority: tasks.filter((t) => t.priority === "high" && t.status !== "completed").length,
  };

  return { tasks, addTask, updateTask, deleteTask, toggleComplete, stats };
}
