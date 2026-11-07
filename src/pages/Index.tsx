import { Link } from "react-router-dom";
import { ArrowRight, CheckSquare, MessageSquare, LayoutDashboard, Plug, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Conversational AI",
    description: "Natural language interface that understands context, remembers conversations, and proactively suggests actions.",
    link: "/chat",
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description: "Adaptive widgets that show what matters. Quick wins, calendar conflicts, payment deadlines — all in one view.",
    link: "/dashboard",
  },
  {
    icon: CheckSquare,
    title: "Task Management",
    description: "Create, organize, and track tasks with priorities, categories, and due dates. Kanban or list view.",
    link: "/tasks",
  },
  {
    icon: Plug,
    title: "Integrations Hub",
    description: "Connect Google Calendar, Slack, Notion, Trello and more. Don't dump your apps — enhance them.",
    link: "/integrations",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Local storage by default. Your data stays on your device. Selective sharing, zero monitoring.",
    link: "/privacy",
  },
  {
    icon: Zap,
    title: "AI Orchestration",
    description: "Automated workflows, smart scheduling, proactive reminders. Your AI works while you focus.",
    link: "/dashboard",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Productivity
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Your Intelligent{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Productivity Companion
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            One smart hub to plan, execute, and measure — without leaving the tools you already use. 
            Connect your chaos. Focus your energy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/dashboard">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/chat">Try AI Chat</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">
              A unified platform that adapts to your workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link}>
                <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all group">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 md:p-12 text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">Ready to boost your productivity?</h2>
              <p className="text-muted-foreground">
                Start managing your tasks, connect your apps, and let AI handle the coordination.
              </p>
              <Button asChild size="lg" className="gap-2">
                <Link to="/tasks">
                  Start Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
