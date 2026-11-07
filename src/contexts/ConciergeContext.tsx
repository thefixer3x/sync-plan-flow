/**
 * One shared concierge conversation per signed-in user. The floating bubble
 * and the /chat page render the same Chat instance, so messages stay in sync.
 * History is loaded from and saved to the user's account (server-side).
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase, SUPABASE_FUNCTIONS_URL, SUPABASE_KEY } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { db, type Task } from "@/store/db";
import { buildConciergeContext } from "@/lib/concierge/context";
import { runConciergeTool } from "@/lib/concierge/tools";

const TABLE = "spf_concierge_messages";
const untyped = supabase as unknown as SupabaseClient;

interface ConciergeState {
  chat: Chat<UIMessage> | null;
  status: "signed-out" | "loading" | "ready" | "error";
  loadError: string | null;
  clearConversation: () => Promise<void>;
  reload: () => void;
}

const Ctx = createContext<ConciergeState | null>(null);

export function ConciergeProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(navigate);
  const pageRef = useRef(location.pathname);
  navRef.current = navigate;
  pageRef.current = location.pathname;

  const [chat, setChat] = useState<Chat<UIMessage> | null>(null);
  const [status, setStatus] = useState<ConciergeState["status"]>("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setChat(null); setStatus("signed-out"); return; }
    let cancelled = false;
    setStatus("loading");
    setLoadError(null);

    (async () => {
      const { data, error } = await untyped
        .from(TABLE)
        .select("message_id, role, parts")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(300);
      if (cancelled) return;
      if (error) {
        setLoadError(error.message);
        setStatus("error");
        return;
      }
      const history: UIMessage[] = (data ?? []).map((r) => ({
        id: r.message_id as string,
        role: r.role as UIMessage["role"],
        parts: r.parts as UIMessage["parts"],
      }));

      const instance: Chat<UIMessage> = new Chat<UIMessage>({
        id: `concierge-${user.id}`,
        messages: history,
        transport: new DefaultChatTransport({
          api: `${SUPABASE_FUNCTIONS_URL}/concierge-chat`,
          prepareSendMessagesRequest: async ({ messages }) => {
            const [{ data: s }, tasks] = await Promise.all([
              supabase.auth.getSession(),
              db.getAll<Task>("tasks"),
            ]);
            return {
              headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${s.session?.access_token ?? ""}`,
              },
              body: {
                messages,
                context: buildConciergeContext(tasks, {
                  page: pageRef.current,
                  githubConnected: tasks.some((t) => t.customFields?.source === "github"),
                }),
              },
            };
          },
        }),
        sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
        onToolCall: async ({ toolCall }) => {
          if (toolCall.dynamic) return;
          const output = await runConciergeTool(
            toolCall.toolName,
            (toolCall.input ?? {}) as Record<string, unknown>,
            (path) => navRef.current(path),
          ).catch((e: Error) => ({ ok: false as const, error: e.message }));
          void instance.addToolOutput({ tool: toolCall.toolName, toolCallId: toolCall.toolCallId, output });
        },
      });
      setChat(instance);
      setStatus("ready");
    })();

    return () => { cancelled = true; };
  }, [user, authLoading, attempt]);

  const clearConversation = useCallback(async () => {
    if (!user || !chat) return;
    await chat.stop();
    const { error } = await untyped.from(TABLE).delete().eq("user_id", user.id);
    if (error) throw new Error(error.message);
    chat.messages = [];
  }, [user, chat]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return (
    <Ctx.Provider value={{ chat, status, loadError, clearConversation, reload }}>
      {children}
    </Ctx.Provider>
  );
}

export function useConcierge() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useConcierge must be used inside ConciergeProvider");
  return ctx;
}
