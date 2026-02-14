import { useState } from "react";
import { Calendar, Database, Users, Code, Globe, Music, Zap, CheckCircle, Mail, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const Integrations = () => {
  const [connections, setConnections] = useState<Record<string, boolean>>({
    googleCalendar: false,
    notion: false,
    slack: false,
    trello: false,
    spotify: false,
    github: false,
    gmail: false,
    stripe: false,
  });
  const { toast } = useToast();

  const integrations = [
    { id: "googleCalendar", name: "Google Calendar", description: "Sync events and manage schedules", icon: Calendar, category: "Productivity" },
    { id: "notion", name: "Notion", description: "Access databases and sync notes", icon: Database, category: "Productivity" },
    { id: "slack", name: "Slack", description: "Send messages and team updates", icon: Users, category: "Communication" },
    { id: "trello", name: "Trello", description: "Manage boards and track progress", icon: Zap, category: "Productivity" },
    { id: "gmail", name: "Gmail", description: "Parse emails into tasks and reminders", icon: Mail, category: "Communication" },
    { id: "github", name: "GitHub", description: "Track issues and code activity", icon: Code, category: "Development" },
    { id: "spotify", name: "Spotify", description: "Mood-based focus music", icon: Music, category: "Lifestyle" },
    { id: "stripe", name: "Stripe", description: "Track payments and invoices", icon: CreditCard, category: "Finance" },
  ];

  const handleToggle = (id: string) => {
    const wasConnected = connections[id];
    setConnections((prev) => ({ ...prev, [id]: !prev[id] }));
    toast({
      title: wasConnected ? "Disconnected" : "Connected",
      description: `${integrations.find((i) => i.id === id)?.name} has been ${wasConnected ? "disconnected" : "connected"}.`,
    });
  };

  const categories = [...new Set(integrations.map((i) => i.category))];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-muted-foreground text-sm">
          Connect your existing apps. Don't dump them — enhance them with AI.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-lg font-semibold text-muted-foreground">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations
              .filter((i) => i.category === category)
              .map((integration) => {
                const Icon = integration.icon;
                const connected = connections[integration.id];
                return (
                  <Card key={integration.id} className="hover:border-primary/20 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-sm">{integration.name}</CardTitle>
                            <Badge variant="outline" className="text-xs mt-0.5">{integration.category}</Badge>
                          </div>
                        </div>
                        <Switch checked={connected} onCheckedChange={() => handleToggle(integration.id)} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs">{integration.description}</CardDescription>
                      {connected && (
                        <div className="flex items-center gap-1.5 mt-3 text-green-600">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">Connected</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {/* Coming Soon */}
      <Card className="border-dashed">
        <CardContent className="p-8 text-center space-y-3">
          <Globe className="h-8 w-8 text-muted-foreground mx-auto" />
          <h3 className="font-semibold">More Integrations Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Apple Health, Fitbit, Microsoft Teams, WhatsApp Business, and 6,000+ apps via Zapier webhooks.
          </p>
          <Badge variant="secondary">Coming Soon</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;
