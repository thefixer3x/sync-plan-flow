// Lovable AI Gateway — OpenAI Responses via the AI SDK (adapted from the
// gateway skill example for Deno + tools/structured output).
import { createOpenAI } from "npm:@ai-sdk/openai@4";
import { streamText, type ModelMessage, type ToolSet, type StopCondition } from "npm:ai@7";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
} from "./run-id.ts";

export const GATEWAY_BASE_URL = "https://ai.gateway.lovable.dev";
export const DEFAULT_MODEL = "openai/gpt-6-astra";

export function createGatewayProvider(request: Request, apiKey: string) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: `${GATEWAY_BASE_URL}/v1`,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });
  return { provider, runIdFetch };
}

export const responsesProviderOptions = (effort: "low" | "medium" = "medium") => ({
  openai: {
    store: false,
    forceReasoning: true,
    reasoningEffort: effort,
    reasoningSummary: "auto",
    include: ["reasoning.encrypted_content"],
  },
});

export function streamResponses<TOOLS extends ToolSet>(opts: {
  request: Request;
  apiKey: string;
  instructions: string;
  messages: ModelMessage[];
  tools?: TOOLS;
  stopWhen?: StopCondition<TOOLS>;
  // deno-lint-ignore no-explicit-any
  output?: any;
  effort?: "low" | "medium";
}) {
  const { provider, runIdFetch } = createGatewayProvider(opts.request, opts.apiKey);
  const result = streamText({
    model: provider.responses(DEFAULT_MODEL),
    instructions: opts.instructions,
    messages: opts.messages,
    tools: opts.tools,
    stopWhen: opts.stopWhen,
    output: opts.output,
    abortSignal: opts.request.signal,
    providerOptions: responsesProviderOptions(opts.effort),
  });
  return { result, runIdFetch };
}

/** Maps gateway failures to a status + safe message the UI can show. */
export function gatewayError(e: unknown): { status: number; message: string } {
  const err = e as { statusCode?: number; responseBody?: string; message?: string; name?: string };
  if (err?.name === "AbortError") return { status: 499, message: "Request cancelled." };
  const status = err?.statusCode ?? 500;
  let message = err?.message ?? "AI request failed.";
  try {
    const parsed = err?.responseBody ? JSON.parse(err.responseBody) : null;
    message = parsed?.message ?? parsed?.error?.message ?? message;
  } catch { /* keep message */ }
  if (status === 402) message = message || "Lovable AI credits are used up. Add credits in Settings → Plans & credits.";
  if (status === 429) message = "The AI is busy right now. Please try again in a moment.";
  return { status, message };
}
