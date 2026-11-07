// "Flow" — the productivity concierge. Streams a Lovable AI chat that sees the
// user's current tasks and can act on them through client-executed tools.
// One conversation per user, persisted in spf_concierge_messages.
import { z } from "npm:zod@4";
import { convertToModelMessages, stepCountIs, tool, type UIMessage } from "npm:ai@7";
import { corsHeaders, json, preflight } from "../_shared/http.ts";
import { adminClient, getUser } from "../_shared/supabaseAdmin.ts";
import { gatewayError, streamResponses } from "../_shared/responses.ts";
import { withLovableAiGatewayRunIdHeader } from "../_shared/run-id.ts";

const TABLE = "spf_concierge_messages";
const HISTORY_FOR_MODEL = 40;

const TaskCtx = z.object({
  id: z.string().max(80),
  title: z.string().max(300),
  priority: z.string().max(20),
  status: z.string().max(20),
  dueDate: z.string().max(20).nullable(),
  dueTime: z.string().max(10).nullable(),
  category: z.string().max(60),
  subtasks: z.string().max(20),
  tags: z.array(z.string().max(60)).max(15),
});

const Body = z.object({
  messages: z.array(
    z.object({ id: z.string().max(100), role: z.enum(["user", "assistant", "system"]), parts: z.array(z.any()).max(200) }).passthrough(),
  ).min(1).max(400),
  context: z.object({
    now: z.string().max(60),
    timezone: z.string().max(60),
    tasks: z.array(TaskCtx).max(80),
    stats: z.record(z.string(), z.number()),
    githubConnected: z.boolean(),
    page: z.string().max(60),
  }),
});

const priority = z.enum(["high", "medium", "low"]);
const tools = {
  create_task: tool({
    description: "Create a new task on the user's board. Use for anything the user wants to remember, do, or schedule.",
    inputSchema: z.object({
      title: z.string().describe("Short, verb-first task title"),
      description: z.string().nullable(),
      priority,
      dueDate: z.string().nullable().describe("YYYY-MM-DD in the user's timezone, or null"),
      dueTime: z.string().nullable().describe("HH:MM 24h, or null"),
      category: z.string().nullable().describe("e.g. Work, Personal, Health, Finance, Development"),
    }),
  }),
  update_task: tool({
    description: "Change an existing task: mark done/in progress, reprioritize, reschedule, or rename. Use the task id from context.",
    inputSchema: z.object({
      taskId: z.string(),
      title: z.string().nullable(),
      status: z.enum(["todo", "in-progress", "completed"]).nullable(),
      priority: priority.nullable(),
      dueDate: z.string().nullable().describe("YYYY-MM-DD, or null to leave unchanged"),
    }),
  }),
  add_subtasks: tool({
    description: "Break an existing task into checklist steps.",
    inputSchema: z.object({ taskId: z.string(), subtasks: z.array(z.string()) }),
  }),
  open_page: tool({
    description: "Take the user to a page in the app when they ask to go somewhere or start something there.",
    inputSchema: z.object({ page: z.enum(["dashboard", "tasks", "focus", "integrations", "activity", "settings"]) }),
  }),
};

function instructions(ctx: z.infer<typeof Body>["context"]) {
  const taskLines = ctx.tasks.length
    ? ctx.tasks.map((t) =>
        `- [${t.id}] ${t.title} | ${t.status} | ${t.priority}${t.dueDate ? ` | due ${t.dueDate}${t.dueTime ? ` ${t.dueTime}` : ""}` : ""} | ${t.category}${t.subtasks !== "0/0" ? ` | steps ${t.subtasks}` : ""}${t.tags.length ? ` | #${t.tags.join(" #")}` : ""}`
      ).join("\n")
    : "(no tasks yet)";
  return `You are Flow, the user's personal productivity concierge inside the Sync Plan Flow app.
Your job: take things off their plate. Plan their day, keep their task board accurate, spot what's urgent, and nudge them toward the next best action.

How you work:
- Be warm, direct and brief. Short paragraphs or tight bullet lists. No filler, no corporate tone, no emojis spam (one is fine).
- Act, don't just advise. When the user asks to add, finish, move, reschedule or break down something, call the matching tool right away, then confirm in one line what changed.
- Resolve relative dates ("tomorrow", "Friday 3pm") using the current time below. Pick a sensible priority yourself if they don't say.
- Only reference tasks that exist in the list below; use their ids exactly. If a request is ambiguous between tasks, ask one short question.
- When asked "what should I do" or to plan, pick 1–3 tasks using priority, due dates and blockers, and explain why in a phrase each. Suggest a focus session when it helps.
- For finances, health or other big decisions, give practical general guidance and suggest a concrete task, not professional advice.
- Never claim you did something unless you called a tool for it. You can't send emails, book things or access calendars yet — say so and offer to add a task instead.

Current time: ${ctx.now} (${ctx.timezone}). User is on the "${ctx.page}" page. GitHub ${ctx.githubConnected ? "is" : "is not"} connected.
Board stats: ${Object.entries(ctx.stats).map(([k, v]) => `${k} ${v}`).join(", ")}.
Tasks (id | status | priority | due | category):
${taskLines}`;
}

/** Keep reasoning only on the latest assistant turn; older turns replay as text + tool results. */
function prepareHistory(messages: UIMessage[]): UIMessage[] {
  let recent = messages.filter((m) => m.role !== "system").slice(-HISTORY_FOR_MODEL);
  while (recent.length && recent[0].role !== "user") recent = recent.slice(1);
  const lastAssistant = recent.map((m) => m.role).lastIndexOf("assistant");
  return recent.map((m, i) =>
    m.role === "assistant" && i !== lastAssistant
      ? { ...m, parts: m.parts.filter((p) => p.type !== "reasoning") }
      : m
  );
}

Deno.serve(async (req) => {
  const pre = preflight(req);
  if (pre) return pre;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const admin = adminClient();
  const user = await getUser(req, admin);
  if (!user) return json({ error: "Sign in to chat with Flow." }, 401);

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "Lovable AI is not configured for this project yet." }, 500);

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: "Invalid request", details: parsed.error.flatten() }, 400);
  const messages = parsed.data.messages as unknown as UIMessage[];
  const ctx = parsed.data.context;

  // Persist the newest turn(s) before streaming: the user's message, or an
  // assistant message that just received a client tool result.
  const toSave = messages.slice(-2).map((m) => ({
    user_id: user.id,
    message_id: m.id,
    role: m.role,
    parts: m.parts,
    updated_at: new Date().toISOString(),
  }));
  const { error: saveErr } = await admin.from(TABLE).upsert(toSave, { onConflict: "user_id,message_id" });
  if (saveErr) {
    console.error("concierge-chat: could not save messages", saveErr);
    return json({ error: "Couldn't save your message. Please try again." }, 500);
  }

  try {
    const modelMessages = await convertToModelMessages(prepareHistory(messages), {
      tools,
      ignoreIncompleteToolCalls: true,
    });
    const { result, runIdFetch } = streamResponses({
      request: req,
      apiKey,
      instructions: instructions(ctx),
      messages: modelMessages,
      tools,
      stopWhen: stepCountIs(8),
    });

    const response = result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      headers: corsHeaders,
      onError: (e) => {
        const { status, message } = gatewayError(e);
        console.error(`concierge-chat stream error [${status}]:`, e);
        return message;
      },
      onFinish: async ({ responseMessage }) => {
        const { error } = await admin.from(TABLE).upsert(
          {
            user_id: user.id,
            message_id: responseMessage.id,
            role: responseMessage.role,
            parts: responseMessage.parts,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,message_id" },
        );
        if (error) console.error("concierge-chat: could not save reply", error);
      },
    });
    return await withLovableAiGatewayRunIdHeader(response, runIdFetch, corsHeaders);
  } catch (e) {
    const { status, message } = gatewayError(e);
    console.error(`concierge-chat failed [${status}]:`, e);
    return json({ error: message }, status);
  }
});
