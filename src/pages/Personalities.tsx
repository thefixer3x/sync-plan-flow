import { useState } from "react";
import { Bot, Zap, Heart, Brain, Coffee, Rocket, Check, Settings2, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const PERSONALITIES = [
  {
    id: "coach",
    name: "The Coach",
    emoji: "🏆",
    icon: Rocket,
    tagline: "Motivating, goal-focused, high energy",
    description: "Pushes you to hit your targets. Celebrates wins loudly. Holds you accountable without being harsh.",
    tone: "Encouraging",
    style: "Direct",
    traits: ["Goal-oriented", "Celebrates milestones", "Accountability partner", "High energy"],
    sampleMessage: "You've cleared 4 tasks today — that's 80% of your daily goal! One more and you're crushing it. What's next?",
    color: "hsl(var(--primary))",
  },
  {
    id: "zen",
    name: "The Zen Master",
    emoji: "🧘",
    icon: Heart,
    tagline: "Calm, mindful, focused on wellbeing",
    description: "Keeps you grounded. Reminds you to breathe. Suggests breaks before burnout hits.",
    tone: "Calm",
    style: "Gentle",
    traits: ["Mindful nudges", "Break reminders", "Low-stress framing", "Flow-state focus"],
    sampleMessage: "You've been in deep work for 90 minutes. A 10-minute walk outside will help you come back sharper. Your tasks will still be here.",
    color: "hsl(152 68% 62%)",
  },
  {
    id: "analyst",
    name: "The Analyst",
    emoji: "📊",
    icon: Brain,
    tagline: "Data-driven, precise, no-fluff",
    description: "Pure signal, no noise. Gives you metrics, patterns, and recommendations based on your history.",
    tone: "Professional",
    style: "Concise",
    traits: ["Productivity metrics", "Pattern detection", "Efficiency insights", "Data-first"],
    sampleMessage: "Your task completion rate is 73% (↑8% vs last week). High-priority tasks are completed 2.3 hrs faster than average. Suggest scheduling deep work before 11 AM.",
    color: "hsl(217 91% 60%)",
  },
  {
    id: "friend",
    name: "The Friend",
    emoji: "☕",
    icon: Coffee,
    tagline: "Casual, warm, conversational",
    description: "Talks to you like a buddy who genuinely cares. No corporate speak, just vibes.",
    tone: "Casual",
    style: "Conversational",
    traits: ["Friendly tone", "Empathetic", "Casual check-ins", "No pressure"],
    sampleMessage: "Hey! Quick heads up — that report is due tomorrow and I noticed you haven't started yet. No stress, just thought you'd want to know 👀",
    color: "hsl(25 95% 63%)",
  },
  {
    id: "sage",
    name: "The Sage",
    emoji: "🔮",
    icon: Zap,
    tagline: "Wise, thoughtful, big-picture",
    description: "Helps you zoom out and see the forest for the trees. Connects daily tasks to long-term goals.",
    tone: "Thoughtful",
    style: "Philosophical",
    traits: ["Big-picture thinking", "Goal alignment", "Weekly reflections", "Wisdom nudges"],
    sampleMessage: "The 3 tasks you completed today all connect to your Q1 goal of launching the product. Every step matters. What's the one thing you can do tomorrow that creates the most leverage?",
    color: "hsl(262 83% 58%)",
  },
  {
    id: "exec",
    name: "The Exec",
    emoji: "💼",
    icon: Settings2,
    tagline: "Efficient, decisive, time-conscious",
    description: "Respects your time. Bullet points only. Makes decisions for you when you're overwhelmed.",
    tone: "Professional",
    style: "Terse",
    traits: ["Time-aware", "Decision support", "Priority sorting", "No small talk"],
    sampleMessage: "3 priorities for today: 1) Finish client deck (due 3 PM). 2) Review budget doc. 3) Send team update. Estimated: 4.5 hrs. You have 6 hrs available. On track.",
    color: "hsl(329 86% 70%)",
  },
];

const PERSONALITY_STORAGE_KEY = "ai-personality";
const SETTINGS_STORAGE_KEY = "ai-personality-settings";

const loadSettings = () => {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "{}");
  } catch { return {}; }
};

const Personalities = () => {
  const stored = loadSettings();
  const [active, setActive] = useState<string>(
    localStorage.getItem(PERSONALITY_STORAGE_KEY) || "coach"
  );
  const [proactivity, setProactivity] = useState<number>(stored.proactivity ?? 50);
  const [verbosity, setVerbosity] = useState<number>(stored.verbosity ?? 50);
  const [morningBriefing, setMorningBriefing] = useState<boolean>(stored.morningBriefing ?? true);
  const [contextMemory, setContextMemory] = useState<boolean>(stored.contextMemory ?? true);
  const [emojiMode, setEmojiMode] = useState<boolean>(stored.emojiMode ?? false);
  const { toast } = useToast();

  const handleActivate = (id: string) => {
    setActive(id);
    localStorage.setItem(PERSONALITY_STORAGE_KEY, id);
    const p = PERSONALITIES.find((p) => p.id === id)!;
    toast({
      title: `${p.emoji} ${p.name} activated!`,
      description: `Your AI will now communicate in ${p.tone.toLowerCase()} mode.`,
    });
  };

  const saveSettings = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify({ proactivity, verbosity, morningBriefing, contextMemory, emojiMode }));
    toast({ title: "Settings saved ✨", description: "Your AI personality preferences are updated." });
  };

  const activePersonality = PERSONALITIES.find((p) => p.id === active)!;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">AI Personalities</h1>
        <p className="text-sm text-muted-foreground">
          Choose how your AI assistant communicates. Switch anytime.
        </p>
      </div>

      {/* Active personality banner */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5 flex items-center gap-4 flex-wrap">
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: `${activePersonality.color}22` }}
          >
            {activePersonality.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Currently active: {activePersonality.name}</p>
            <p className="text-xs text-muted-foreground">{activePersonality.tagline}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </CardContent>
      </Card>

      {/* Personality cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PERSONALITIES.map((p) => {
          const isActive = active === p.id;
          const Icon = p.icon;
          return (
            <Card
              key={p.id}
              className={`cursor-pointer transition-all hover:border-primary/30 flex flex-col ${
                isActive ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleActivate(p.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div
                    className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${p.color}22` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  {isActive && (
                    <Badge className="shrink-0">
                      <Check className="h-3 w-3 mr-1" /> Active
                    </Badge>
                  )}
                </div>
                <div className="pt-1">
                  <CardTitle className="text-base">{p.emoji} {p.name}</CardTitle>
                  <CardDescription className="text-xs mt-0.5">{p.tagline}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.traits.map((t) => (
                    <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>

                {/* Sample message */}
                <div className="bg-muted/50 rounded-lg p-3 border-l-2 mt-2" style={{ borderColor: p.color }}>
                  <p className="text-xs italic text-muted-foreground leading-relaxed">"{p.sampleMessage}"</p>
                </div>

                <Button
                  size="sm"
                  className="w-full text-xs mt-1"
                  variant={isActive ? "default" : "outline"}
                  onClick={(e) => { e.stopPropagation(); handleActivate(p.id); }}
                >
                  {isActive ? "Currently Active" : "Activate"}
                  {!isActive && <ChevronRight className="h-3 w-3 ml-1" />}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Fine-tune settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-primary" />
            Fine-tune Behavior
          </CardTitle>
          <CardDescription className="text-xs">
            Adjust how proactive and verbose your AI is, regardless of personality.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Proactivity</Label>
                <span className="text-xs text-muted-foreground">
                  {proactivity < 33 ? "Minimal" : proactivity < 66 ? "Moderate" : "High"}
                </span>
              </div>
              <Slider min={0} max={100} step={5} value={[proactivity]} onValueChange={([v]) => setProactivity(v)} />
              <p className="text-xs text-muted-foreground">How often the AI suggests actions without being asked.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Response Length</Label>
                <span className="text-xs text-muted-foreground">
                  {verbosity < 33 ? "Concise" : verbosity < 66 ? "Balanced" : "Detailed"}
                </span>
              </div>
              <Slider min={0} max={100} step={5} value={[verbosity]} onValueChange={([v]) => setVerbosity(v)} />
              <p className="text-xs text-muted-foreground">Short bullet points vs. fuller explanations.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { label: "Morning briefing", desc: "Daily 8 AM summary", value: morningBriefing, onChange: setMorningBriefing },
              { label: "Context memory", desc: "Remember past conversations", value: contextMemory, onChange: setContextMemory },
              { label: "Emoji mode", desc: "Add emojis to responses", value: emojiMode, onChange: setEmojiMode },
            ].map(({ label, desc, value, onChange }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch checked={value} onCheckedChange={onChange} />
              </div>
            ))}
          </div>

          <Button onClick={saveSettings} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Personalities;
