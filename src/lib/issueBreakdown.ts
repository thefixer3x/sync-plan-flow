import type { Task } from "@/store/db";

export interface GeneratedSubtask {
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
  estimateMinutes: number;
}

export interface IssueInput {
  title: string;
  body: string;
  labels: string[];
  repo: string | null;
  url: string | null;
}

/** Rebuilds the issue the AI needs from a task synced from GitHub. */
export function issueFromTask(task: Task): IssueInput {
  const url = typeof task.customFields?.url === "string" ? task.customFields.url : null;
  const labelsRaw = typeof task.customFields?.labels === "string" ? task.customFields.labels : "";
  let body = task.description ?? "";
  if (url && body.trimEnd().endsWith(url)) body = body.trimEnd().slice(0, -url.length).trimEnd();
  return {
    title: task.title,
    body,
    labels: labelsRaw ? labelsRaw.split(",").map((l) => l.trim()).filter(Boolean) : [],
    repo: task.tags?.find((t) => t.includes("/")) ?? null,
    url,
  };
}

export const isGithubTask = (t: Task) => t.customFields?.source === "github";

/**
 * Turns AI subtasks into new board tasks linked to the parent issue task.
 * They keep the AI's priority, inherit the parent's due date, and carry the
 * repo tag so they group with the issue.
 */
export function subtasksToTasks(
  parent: Task,
  subtasks: GeneratedSubtask[],
): Omit<Task, "id" | "status" | "completedAt">[] {
  const issueNo = typeof parent.customFields?.url === "string"
    ? parent.customFields.url.match(/\/(?:issues|pull)\/(\d+)/)?.[1]
    : undefined;
  const repoTag = parent.tags?.find((t) => t.includes("/"));
  return subtasks.map((s) => ({
    title: s.title,
    description: s.detail,
    priority: s.priority,
    category: parent.category || "Development",
    dueDate: parent.dueDate,
    estimatedTime: s.estimateMinutes,
    tags: ["github", "ai-breakdown", ...(repoTag ? [repoTag] : []), ...(issueNo ? [`#${issueNo}`] : [])],
    customFields: {
      source: "ai-breakdown",
      parentTaskId: parent.id,
      ...(typeof parent.customFields?.url === "string" ? { url: parent.customFields.url } : {}),
    },
  }));
}
