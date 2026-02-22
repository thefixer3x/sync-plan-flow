import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Mic, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Good morning! I noticed you have 3 urgent tasks and a payment due tomorrow. Should I prioritize these?",
    timestamp: "9:00 AM",
  },
  {
    id: "2",
    role: "user",
    content: "Yes, show me the payment details first",
    timestamp: "9:01 AM",
  },
  {
    id: "3",
    role: "ai",
    content: "Your electricity bill (£127) is due tomorrow. I can set up a reminder for 6 PM today, or would you prefer to handle it now?",
    timestamp: "9:01 AM",
  },
  {
    id: "4",
    role: "user",
    content: "Set the reminder for 6 PM, and also remind me about gym",
    timestamp: "9:02 AM",
  },
  {
    id: "5",
    role: "ai",
    content: "✅ Done! Reminder set for 6 PM. I also see you have gym blocked for 7:30 PM — perfect timing after dinner. Would you like me to prioritize your remaining tasks by deadline?",
    timestamp: "9:02 AM",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        content: "I'm processing your request. This is a demo — in production, I'd connect to your AI backend to provide intelligent responses based on your tasks, schedule, and preferences.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] md:h-screen flex flex-col">
      <div className="p-6 pb-0">
        <h1 className="text-2xl font-bold">AI Chat</h1>
        <p className="text-sm text-muted-foreground">Your intelligent productivity assistant</p>
      </div>

      <div className="flex-1 flex flex-col p-6 min-h-0">
        <Card className="flex-1 flex flex-col min-h-0">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 max-w-[80%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === "ai" ? "bg-primary/10" : "bg-muted"
                )}>
                  {msg.role === "ai" ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "rounded-xl px-4 py-3",
                  msg.role === "ai"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                )}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <span className={cn(
                    "text-xs mt-1 block",
                    msg.role === "ai" ? "text-muted-foreground" : "text-primary-foreground/70"
                  )}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
