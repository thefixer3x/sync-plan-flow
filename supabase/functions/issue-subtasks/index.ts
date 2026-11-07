// Turns one synced GitHub issue into clear, prioritized subtasks using Lovable AI.
import { z } from "npm:zod@4";
import { NoObjectGeneratedError, Output } from "npm:ai@7";
import { json, preflight } from "../_shared/http.ts";
import { adminClient, getUser } from "../_shared/supabaseAdmin.ts";
import { gatewayError, streamResponses } from "../_shared/responses.ts";

const Body = z.object({
  issue: z.object({
    title: z.string().min(1).max(300),
    body: z.string().max(8000).default(""),
    labels: z.array(z.string().max(80)).max(30).default([]),
    repo: z.string().max(200).nullable().default(null),
    url: z.string().max(500).nullable().default(null),
  }),
});

const SubtaskSchema = z.object({
  summary: z.string(),
  subtasks: z.array(
    z.object({
      title: z.string(),
      detail: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      estimateMinutes: z.number(),
    }),
  ),
});

const INSTRUCTIONS = `You are a senior engineering lead helping a task manager plan work.
Break the GitHub issue you are given into 3 to 8 concrete, independently checkable subtasks.
Rules:
- Each title starts with a verb and is under 80 characters (e.g. "Add retry to webhook handler").
- "detail" is one or two plain sentences: what done looks like.
- Order subtasks in the sequence they should be done; blockers and investigation first.
- priority: "high" for blockers, bugs affecting users, or anything other subtasks depend on; "medium" for core work; "low" for polish, docs, nice-to-haves.
- estimateMinutes: a realistic whole-number estimate between 15 and 480.
- "summary" is one sentence describing the overall goal.
Never invent requirements the issue does not imply. If the issue is vague, include an early subtask to clarify scope.`;

const ORDER = { high: 0, medium: 1, low: 2 } as const;

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const admin = adminClient();
  const user = await getUser(req, admin);
  if (!user) return json({ error: "Sign in required" }, 401);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "Lovable AI is not configured for this project yet." }, 500);

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Invalid request", details: parsed.error.flatten() }, 400);
  const { issue } = parsed.data;

  const prompt = [
    `Issue: ${issue.title}`,
    issue.repo ? `Repository: ${issue.repo}` : null,
    issue.labels.length ? `Labels: ${issue.labels.join(", ")}` : null,
    issue.url ? `Link: ${issue.url}` : null,
    "",
    issue.body.trim() || "(No description provided.)",
  ].filter((l) => l !== null).join("\n");

  try {
    const { result } = streamResponses({
      request: req,
      apiKey,
      instructions: INSTRUCTIONS,
      messages: [{ role: "user", content: prompt }],
      output: Output.object({ schema: SubtaskSchema }),
      effort: "low",
    });
    const output = (await result.output) as z.infer<typeof SubtaskSchema>;
    const subtasks = output.subtasks
      .filter((s) => s.title.trim())
      .slice(0, 8)
      .map((s, i) => ({
        title: s.title.trim().slice(0, 120),
        detail: s.detail.trim().slice(0, 400),
        priority: s.priority,
        estimateMinutes: Math.min(480, Math.max(15, Math.round(s.estimateMinutes || 30))),
        order: i,
      }))
      .sort((a, b) => ORDER[a.priority] - ORDER[b.priority] || a.order - b.order);
    if (subtasks.length === 0) return json({ error: "The AI couldn't break this issue down. Add more detail to the issue and try again." }, 422);
    return json({ summary: output.summary.trim(), subtasks });
  } catch (e) {
    if (NoObjectGeneratedError.isInstance(e)) {
      console.error("issue-subtasks: no object generated", e.text?.slice(0, 500));
      return json({ error: "The AI reply couldn't be read. Please try again." }, 502);
    }
    const { status, message } = gatewayError(e);
    console.error(`issue-subtasks failed [${status}]:`, e);
    return json({ error: message }, status);
  }
});
