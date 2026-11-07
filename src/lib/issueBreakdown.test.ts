import { describe, expect, it } from "vitest";
import { issueFromTask, subtasksToTasks } from "@/lib/issueBreakdown";
import type { Task } from "@/store/db";

const parent: Task = {
  id: "parent-1",
  title: "Login fails on Safari",
  description: "Users can't sign in.\n\nhttps://github.com/acme/web/issues/42",
  priority: "high",
  status: "todo",
  category: "Development",
  dueDate: "2026-11-10",
  tags: ["github", "issue", "acme/web"],
  customFields: { source: "github", githubId: 99, url: "https://github.com/acme/web/issues/42", labels: "bug, safari" },
};

describe("issueFromTask", () => {
  it("strips the trailing link from the body and recovers labels and repo", () => {
    const issue = issueFromTask(parent);
    expect(issue.body).toBe("Users can't sign in.");
    expect(issue.labels).toEqual(["bug", "safari"]);
    expect(issue.repo).toBe("acme/web");
    expect(issue.url).toBe("https://github.com/acme/web/issues/42");
  });
});

describe("subtasksToTasks", () => {
  const [first, second] = subtasksToTasks(parent, [
    { title: "Reproduce on Safari 18", detail: "Confirm the failing step.", priority: "high", estimateMinutes: 30 },
    { title: "Update docs", detail: "Note the fix.", priority: "low", estimateMinutes: 20 },
  ]);

  it("keeps the AI's priority for each subtask", () => {
    expect(first.priority).toBe("high");
    expect(second.priority).toBe("low");
  });

  it("links every subtask back to the issue task", () => {
    expect(first.customFields?.parentTaskId).toBe("parent-1");
    expect(first.customFields?.source).toBe("ai-breakdown");
  });

  it("inherits the issue's due date and stores the estimate", () => {
    expect(first.dueDate).toBe("2026-11-10");
    expect(first.estimatedTime).toBe(30);
  });

  it("tags subtasks with the repo and issue number", () => {
    expect(first.tags).toEqual(["github", "ai-breakdown", "acme/web", "#42"]);
  });
});
