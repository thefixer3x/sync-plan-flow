import { useState } from "react";
import { Users, Target, Flame, Trophy, Plus, Check, MessageSquare, UserPlus, Star, TrendingUp, CheckSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: string;
  name: string;
  initials: string;
  goal: string;
  streak: number;
  completedToday: number;
  totalToday: number;
  status: "online" | "away" | "offline";
  color: string;
}

interface SharedGoal {
  id: string;
  title: string;
  description: string;
  members: string[];
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  category: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  initials: string;
  streak: number;
  tasksCompleted: number;
  points: number;
  isYou?: boolean;
}

const PARTNERS: Partner[] = [
  { id: "1", name: "Alex Chen", initials: "AC", goal: "Launch SaaS MVP", streak: 14, completedToday: 5, totalToday: 7, status: "online", color: "hsl(var(--primary))" },
  { id: "2", name: "Sam Rivers", initials: "SR", goal: "Complete fitness challenge", streak: 8, completedToday: 3, totalToday: 4, status: "online", color: "hsl(152 68% 62%)" },
  { id: "3", name: "Jordan P.", initials: "JP", goal: "Read 20 books this year", streak: 22, completedToday: 1, totalToday: 1, status: "away", color: "hsl(25 95% 63%)" },
];

const SHARED_GOALS: SharedGoal[] = [
  { id: "1", title: "Ship 30 features by Q2", description: "Team goal to launch core product features before end of quarter", members: ["You", "Alex Chen", "Sam Rivers"], progress: 18, target: 30, unit: "features", deadline: "Jun 30", category: "Work" },
  { id: "2", title: "100-day consistency challenge", description: "Complete at least 3 tasks every day for 100 days", members: ["You", "Jordan P."], progress: 47, target: 100, unit: "days", deadline: "Apr 15", category: "Habit" },
  { id: "3", title: "Team wellness sprint", description: "Exercise and log it for 30 consecutive days", members: ["You", "Sam Rivers", "Jordan P."], progress: 12, target: 30, unit: "days", deadline: "Mar 20", category: "Health" },
];

const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Jordan P.", initials: "JP", streak: 22, tasksCompleted: 143, points: 2840 },
  { rank: 2, name: "Alex Chen", initials: "AC", streak: 14, tasksCompleted: 118, points: 2210 },
  { rank: 3, name: "You", initials: "ME", streak: 9, tasksCompleted: 97, points: 1890, isYou: true },
  { rank: 4, name: "Sam Rivers", initials: "SR", streak: 8, tasksCompleted: 84, points: 1540 },
];

const MY_ACHIEVEMENTS = [
  { id: "1", name: "First Streak", desc: "Complete tasks 7 days in a row", emoji: "🔥", unlocked: true },
  { id: "2", name: "Century Club", desc: "Complete 100 tasks total", emoji: "💯", unlocked: true },
  { id: "3", name: "Early Bird", desc: "Complete a task before 8 AM", emoji: "🌅", unlocked: true },
  { id: "4", name: "On Fire", desc: "Complete 10 tasks in one day", emoji: "⚡", unlocked: false },
  { id: "5", name: "Accountability Pro", desc: "Support 3 accountability partners", emoji: "🤝", unlocked: false },
  { id: "6", name: "Goal Crusher", desc: "Finish a shared goal ahead of schedule", emoji: "🏆", unlocked: false },
];

const Social = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const { toast } = useToast();

  const handleCheckIn = () => {
    setCheckedIn(true);
    toast({ title: "✅ Checked in!", description: "Your partners have been notified. Keep the streak alive 🔥" });
  };

  const handleNudge = (name: string) => {
    toast({ title: `Nudge sent to ${name}!`, description: "They'll get a friendly reminder to check in today." });
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Social Productivity</h1>
          <p className="text-sm text-muted-foreground">
            Accountability partners, shared goals, and friendly competition.
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <UserPlus className="h-3.5 w-3.5" />
          Add Partner
        </Button>
      </div>

      {/* Daily check-in banner */}
      <Card className={`border-primary/30 ${checkedIn ? "bg-green-500/5 border-green-500/30" : "bg-primary/5"}`}>
        <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${checkedIn ? "bg-green-500/20" : "bg-primary/10"}`}>
              {checkedIn ? "✅" : "📋"}
            </div>
            <div>
              <p className="text-sm font-semibold">
                {checkedIn ? "You've checked in today!" : "Daily Check-in"}
              </p>
              <p className="text-xs text-muted-foreground">
                {checkedIn ? "Your partners can see your progress. Keep it up! 🔥" : "Let your accountability partners know you're on track"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-orange-500">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-bold">9 day streak</span>
            </div>
            {!checkedIn && (
              <Button size="sm" onClick={handleCheckIn} className="gap-2">
                <Check className="h-3.5 w-3.5" />
                Check In
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="partners">
        <TabsList>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="goals">Shared Goals</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* ─── Partners ─── */}
        <TabsContent value="partners" className="mt-5 space-y-4">
          <p className="text-xs text-muted-foreground">Your accountability circle — people you keep on track and who keep you on track.</p>
          {PARTNERS.map((p) => (
            <Card key={p.id} className="hover:border-primary/20 transition-colors">
              <CardContent className="p-4 flex items-center gap-4 flex-wrap">
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback style={{ background: `${p.color}22`, color: p.color }}>
                      {p.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                    p.status === "online" ? "bg-green-500" : p.status === "away" ? "bg-yellow-500" : "bg-muted"
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <Badge variant="outline" className="text-xs capitalize">{p.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{p.goal}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame className="h-3 w-3" />
                      <span className="text-xs font-medium">{p.streak}d streak</span>
                    </div>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{p.completedToday}/{p.totalToday} tasks today</span>
                  </div>
                  <Progress value={(p.completedToday / p.totalToday) * 100} className="h-1.5 mt-2 max-w-[200px]" />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="text-xs gap-1" onClick={() => handleNudge(p.name)}>
                    <MessageSquare className="h-3 w-3" />
                    Nudge
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">View</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed">
            <CardContent className="p-6 text-center space-y-3">
              <UserPlus className="h-7 w-7 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium">Invite an accountability partner</p>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Share a link with a friend, colleague, or coach. They'll see your daily check-in and goals.
              </p>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="h-3.5 w-3.5" />
                Send Invite Link
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Shared Goals ─── */}
        <TabsContent value="goals" className="mt-5 space-y-5">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">Collaborative goals you and your partners are working toward together.</p>
            <Button size="sm" variant="outline" className="gap-2 text-xs">
              <Plus className="h-3.5 w-3.5" />
              New Goal
            </Button>
          </div>

          {SHARED_GOALS.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <CardDescription className="text-xs mt-0.5">{goal.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{goal.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{goal.progress} / {goal.target} {goal.unit}</span>
                    <span className="text-xs text-muted-foreground">Due {goal.deadline}</span>
                  </div>
                  <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round((goal.progress / goal.target) * 100)}% complete</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground">Members:</span>
                  {goal.members.map((m, i) => (
                    <Badge key={i} variant="outline" className={`text-xs ${m === "You" ? "border-primary/40 text-primary" : ""}`}>
                      {m}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── Leaderboard ─── */}
        <TabsContent value="leaderboard" className="mt-5 space-y-4">
          <p className="text-xs text-muted-foreground">Weekly productivity ranking across your circle. Resets every Monday.</p>
          <Card>
            <CardContent className="p-0">
              {LEADERBOARD.map((entry, i) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 p-4 ${i !== LEADERBOARD.length - 1 ? "border-b" : ""} ${entry.isYou ? "bg-primary/5" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    entry.rank === 1 ? "bg-yellow-500/20 text-yellow-600" :
                    entry.rank === 2 ? "bg-muted text-muted-foreground" :
                    "text-muted-foreground"
                  }`}>
                    {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : entry.rank}
                  </div>

                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={entry.isYou ? "bg-primary/20 text-primary" : "bg-muted"}>
                      {entry.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${entry.isYou ? "text-primary" : ""}`}>
                      {entry.name} {entry.isYou && <Badge className="text-xs ml-1">You</Badge>}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-orange-500" />{entry.streak}d</span>
                      <span className="flex items-center gap-1"><CheckSquare className="h-3 w-3" />{entry.tasksCompleted}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold">{entry.points.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Points are earned by completing tasks, maintaining streaks, and hitting shared goals. More partners = bigger leaderboard.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Achievements ─── */}
        <TabsContent value="achievements" className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MY_ACHIEVEMENTS.map((a) => (
              <Card key={a.id} className={`${a.unlocked ? "border-primary/20" : "opacity-60 grayscale"}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <span className="text-3xl">{a.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                    {a.unlocked && (
                      <Badge variant="outline" className="text-xs mt-1 text-green-600 border-green-500/30">
                        <Star className="h-2.5 w-2.5 mr-1 fill-green-600" /> Unlocked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Social;
