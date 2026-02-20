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

export interface AppSettings {
  key: string;
  value: unknown;
}

class AppDB extends Dexie {
  tasks!: Table<Task, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super("ai-productivity-db");

    this.version(1).stores({
      tasks: "id, status, priority, category, dueDate",
      settings: "key",
    });
  }
}

export const db = new AppDB();

// ── Default seed tasks (only inserted once) ──────────────────────────────────
const SEED_KEY = "tasks-seeded-v1";

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
