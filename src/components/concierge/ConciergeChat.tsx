import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import type { Chat } from "@ai-sdk/react";
import { isToolUIPart, type UIMessage } from "ai";
import { CalendarPlus, CheckCircle2, ListPlus, Mic, MicOff, Navigation, RotateCcw, Trash2 } from "lucide-react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputButton, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useConcierge } from "@/contexts/ConciergeContext";
import { cn } from "@/lib/utils";
import flowMark from "@/assets/flow-concierge.png";

const SUGGESTIONS = [
  "Plan my day",
  "What's overdue?",
  "Remind me to pay rent on Friday",
  "Break my top task into steps",
];

const TOOL_META: Record<string, { label: string; icon: typeof ListPlus }> = {
  create_task: { label: "Add task", icon: CalendarPlus },
  update_task: { label: "Update task", icon: CheckCircle2 },
  add_subtasks: { label: "Add steps", icon: ListPlus },
  open_page: { label: "Open page", icon: Navigation },
};

function readError(error: Error | undefined): string | null {
  if (!error) return null;
  try {
    const parsed = JSON.parse(error.message);
    return parsed?.error ?? error.message;
  } catch {
    return error.message || "Something went wrong.";
  }
}

export function ConciergeMark({ className }: { className?: string }) {
  return <img src={flowMark} alt="Flow" width={40} height={40} className={cn("h-10 w-10 shrink-0", className)} />;
}

export function ConciergeChat({ compact = false }: { compact?: boolean }) {
  const { chat, status, loadError, reload } = useConcierge();

  if (status === "signed-out") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <ConciergeMark className="h-14 w-14" />
        <p className="font-semibold">Meet Flow, your concierge</p>
        <p className="text-sm text-muted-foreground max-w-xs">Sign in and Flow can plan your day, add and update tasks, and remember your conversation on every device.</p>
        <Button asChild><Link to="/auth?next=/chat">Sign in to chat</Link></Button>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-destructive">Couldn't load your conversation: {loadError}</p>
        <Button variant="outline" size="sm" onClick={reload}><RotateCcw className="h-3.5 w-3.5" /> Try again</Button>
      </div>
    );
  }
  if (status === "loading" || !chat) {
    return <div className="flex flex-1 items-center justify-center p-6"><Shimmer>Getting Flow ready…</Shimmer></div>;
  }
  return <ChatSurface chat={chat} compact={compact} />;
}

function ChatSurface({ chat, compact }: { chat: Chat<UIMessage>; compact: boolean }) {
  const { messages, sendMessage, status, stop, error, clearError } = useChat({ chat });
  const { clearConversation } = useConcierge();
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => { if (!busy) textareaRef.current?.focus(); }, [busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    clearError();
    void sendMessage({ text: t });
    setInput("");
  };

  const voice = () => {
    type Rec = { lang: string; interimResults: boolean; onresult: (e: { results: { [i: number]: { [j: number]: { transcript: string } } } }) => void; onerror: () => void; onend: () => void; start: () => void };
    const W = window as unknown as { webkitSpeechRecognition?: new () => Rec; SpeechRecognition?: new () => Rec };
    const Ctor = W.SpeechRecognition ?? W.webkitSpeechRecognition;
    if (!Ctor) { toast({ title: "Voice isn't supported in this browser", variant: "destructive" }); return; }
    const rec = new Ctor();
    rec.lang = navigator.language || "en-GB";
    rec.interimResults = false;
    rec.onresult = (e) => setInput((prev) => `${prev ? `${prev} ` : ""}${e.results[0][0].transcript}`);
    rec.onerror = () => toast({ title: "Couldn't hear that", description: "Try again or type instead.", variant: "destructive" });
    rec.onend = () => setListening(false);
    setListening(true);
    rec.start();
  };

  const clear = async () => {
    try { await clearConversation(); toast({ title: "Conversation cleared" }); }
    catch (e) { toast({ title: "Couldn't clear", description: (e as Error).message, variant: "destructive" }); }
  };

  const errorText = readError(error);
  const last = messages[messages.length - 1];
  const waiting = status === "submitted" || (status === "streaming" && last?.role === "assistant" && !last.parts.some((p) => p.type === "text" && p.text));

  return (
    <div className="flex flex-1 min-h-0 flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent className={cn(compact ? "p-3 gap-5" : "p-4 md:p-6")}>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<ConciergeMark className="h-14 w-14" />}
              title="Hey, I'm Flow"
              description="Tell me what's on your mind — I'll turn it into a plan, keep your board tidy and nudge you toward the next thing."
            >
              <div className="flex flex-col items-center gap-3">
                <ConciergeMark className="h-14 w-14" />
                <div className="space-y-1">
                  <p className="font-semibold">Hey, I'm Flow</p>
                  <p className="text-sm text-muted-foreground max-w-sm">Tell me what's on your mind — I'll turn it into a plan, keep your board tidy and nudge you toward the next thing.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <Button key={s} variant="outline" size="sm" className="rounded-full" onClick={() => send(s)}>{s}</Button>
                  ))}
                </div>
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent className="group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground">
                  {m.parts.map((part, i) => {
                    if (part.type === "text") {
                      return m.role === "assistant"
                        ? <MessageResponse key={i}>{part.text}</MessageResponse>
                        : <p key={i} className="whitespace-pre-wrap">{part.text}</p>;
                    }
                    if (part.type === "reasoning" && part.text) {
                      return (
                        <Reasoning key={i} isStreaming={status === "streaming" && m.id === last?.id && i === m.parts.length - 1} defaultOpen={false}>
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    }
                    if (isToolUIPart(part)) {
                      const name = part.type.replace(/^tool-/, "");
                      const meta = TOOL_META[name] ?? { label: name, icon: ListPlus };
                      const Icon = meta.icon;
                      const out = part.state === "output-available" ? (part.output as { ok?: boolean; summary?: string; error?: string }) : null;
                      return (
                        <div key={i} className="space-y-1">
                          {out && (
                            <p className={cn("flex items-center gap-1.5 text-xs font-medium", out.ok ? "text-primary" : "text-destructive")}>
                              <Icon className="h-3.5 w-3.5" /> {out.ok ? out.summary : out.error}
                            </p>
                          )}
                          <Tool defaultOpen={false} className="mb-0">
                            <ToolHeader type={part.type as `tool-${string}`} state={part.state} title={meta.label} />
                            <ToolContent>
                              <ToolInput input={part.input} />
                              <ToolOutput output={part.output} errorText={part.errorText} />
                            </ToolContent>
                          </Tool>
                        </div>
                      );
                    }
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
          {waiting && (
            <Message from="assistant">
              <MessageContent><Shimmer>Flow is thinking…</Shimmer></MessageContent>
            </Message>
          )}
          {errorText && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{errorText}</div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className={cn("border-t", compact ? "p-3" : "p-4")}>
        <PromptInput onSubmit={(msg) => send(msg.text ?? input)}>
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? "Listening…" : "Ask Flow to plan, add or move anything…"}
            className={compact ? "min-h-10" : undefined}
          />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton onClick={voice} aria-label={listening ? "Listening" : "Speak"} variant={listening ? "secondary" : "ghost"}>
                {listening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </PromptInputButton>
              {messages.length > 0 && (
                <PromptInputButton onClick={clear} aria-label="Clear conversation" variant="ghost" disabled={busy}>
                  <Trash2 className="size-4" />
                </PromptInputButton>
              )}
            </PromptInputTools>
            <PromptInputSubmit status={status} onStop={() => void stop()} disabled={!busy && !input.trim()} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
