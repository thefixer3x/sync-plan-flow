import { useState } from "react";
import { 
  Plug, 
  Calendar, 
  Cloud, 
  Database, 
  Zap, 
  Settings, 
  Shield, 
  CheckCircle, 
  Upload,
  Download,
  Smartphone,
  Globe,
  Code,
  Cpu,
  HardDrive,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Connectivity = () => {
  const [connections, setConnections] = useState({
    googleCalendar: false,
    notion: false,
    slack: false,
    trello: false,
    spotify: false,
    github: false
  });
  
  const [memoryProvider, setMemoryProvider] = useState("local");
  const [webhookUrl, setWebhookUrl] = useState("");
  const { toast } = useToast();

  const handleConnectionToggle = (service: string) => {
    setConnections(prev => ({
      ...prev,
      [service]: !prev[service as keyof typeof prev]
    }));
    
    toast({
      title: `${service} ${connections[service as keyof typeof connections] ? 'Disconnected' : 'Connected'}`,
      description: `Your ${service} integration has been ${connections[service as keyof typeof connections] ? 'disabled' : 'enabled'}.`,
    });
  };

  const integrations = [
    {
      id: "googleCalendar",
      name: "Google Calendar",
      description: "Sync events, create meetings, manage schedules",
      icon: Calendar,
      category: "productivity",
      color: "bg-blue-500"
    },
    {
      id: "notion",
      name: "Notion",
      description: "Access databases, create pages, sync notes",
      icon: Database,
      category: "productivity",
      color: "bg-black"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Send messages, manage channels, team updates",
      icon: Users,
      category: "communication",
      color: "bg-purple-500"
    },
    {
      id: "trello",
      name: "Trello",
      description: "Create cards, manage boards, track progress",
      icon: Settings,
      category: "productivity",
      color: "bg-blue-600"
    },
    {
      id: "spotify",
      name: "Spotify",
      description: "Control playback, manage playlists, mood-based music",
      icon: Globe,
      category: "lifestyle",
      color: "bg-green-500"
    },
    {
      id: "github",
      name: "GitHub",
      description: "Manage repositories, track issues, code analytics",
      icon: Code,
      category: "development",
      color: "bg-gray-800"
    }
  ];

  const memoryOptions = [
    {
      id: "local",
      name: "Local Storage",
      description: "Store data on your device - maximum privacy",
      icon: HardDrive,
      features: ["Zero cloud dependency", "Instant access", "Complete privacy", "No subscription needed"]
    },
    {
      id: "cloud",
      name: "Our Cloud Memory",
      description: "Managed memory service with sync across devices",
      icon: Cloud,
      features: ["Cross-device sync", "Automatic backups", "Advanced search", "Collaboration features"]
    },
    {
      id: "custom",
      name: "Your Own Storage",
      description: "Connect your Google Drive, Dropbox, or custom solution",
      icon: Upload,
      features: ["Use your existing storage", "Full data ownership", "Custom retention policies", "API flexibility"]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Connectivity Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Connect your existing applications and choose your memory provider. Don't dump your apps - enhance them with intelligent automation.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Plug className="w-5 h-5 mr-2" />
              Personal Agent SDK
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Cpu className="w-5 h-5 mr-2" />
              Seamless Integration
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="integrations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="integrations">App Integrations</TabsTrigger>
            <TabsTrigger value="memory">Memory as a Service</TabsTrigger>
            <TabsTrigger value="sdk">Personal Agent SDK</TabsTrigger>
          </TabsList>

          {/* App Integrations Tab */}
          <TabsContent value="integrations" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                const isConnected = connections[integration.id as keyof typeof connections];
                
                return (
                  <Card key={integration.id} className="relative overflow-hidden hover-scale transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${integration.color} text-white`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {integration.category}
                            </Badge>
                          </div>
                        </div>
                        <Switch
                          checked={isConnected}
                          onCheckedChange={() => handleConnectionToggle(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {integration.description}
                      </CardDescription>
                      {isConnected && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Connected & Syncing</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  Custom Integration via Webhook
                </CardTitle>
                <CardDescription>
                  Connect any application using Zapier or custom webhooks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="https://hooks.zapier.com/hooks/catch/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => {
                    toast({
                      title: "Webhook Added",
                      description: "Your custom integration is now active!",
                    });
                  }}>
                    Add Integration
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connect over 6,000 apps through Zapier or use your own webhook endpoints
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Memory as a Service Tab */}
          <TabsContent value="memory" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {memoryOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = memoryProvider === option.id;
                
                return (
                  <Card 
                    key={option.id} 
                    className={`cursor-pointer transition-all hover-scale ${
                      isSelected ? 'ring-2 ring-primary border-primary' : ''
                    }`}
                    onClick={() => setMemoryProvider(option.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{option.name}</CardTitle>
                          {isSelected && (
                            <Badge className="mt-1">Selected</Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {option.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-accent" />
                  Memory Configuration
                </CardTitle>
                <CardDescription>
                  Advanced settings for your chosen memory provider
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Data Retention</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="retention" defaultChecked />
                      <span className="text-sm">Keep all data indefinitely</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="retention" />
                      <span className="text-sm">Auto-delete after 1 year</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="retention" />
                      <span className="text-sm">Custom retention policy</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Encrypt sensitive data</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Allow cross-device sync</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anonymous usage analytics</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Agent SDK Tab */}
          <TabsContent value="sdk" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Code className="w-8 h-8 text-primary" />
                    SDK Framework
                  </CardTitle>
                  <CardDescription className="text-base">
                    Build your personalized agent with our comprehensive SDK
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Core Components</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <Cpu className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Orchestration Engine</div>
                          <div className="text-sm text-muted-foreground">Core intelligence layer</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <Plug className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Integration Layer</div>
                          <div className="text-sm text-muted-foreground">Connect any service</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <Database className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Memory System</div>
                          <div className="text-sm text-muted-foreground">Persistent context</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-medium">Multi-platform UI</div>
                          <div className="text-sm text-muted-foreground">Web, mobile, desktop</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Settings className="w-8 h-8 text-secondary" />
                    Deployment Options
                  </CardTitle>
                  <CardDescription className="text-base">
                    Choose how to deploy your personalized agent
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg hover:bg-secondary/5 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Cloud className="w-5 h-5 text-secondary" />
                        <div className="font-semibold">Cloud Hosted</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Fully managed service with automatic updates and scaling
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:bg-secondary/5 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <HardDrive className="w-5 h-5 text-secondary" />
                        <div className="font-semibold">Self-Hosted</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Deploy on your own infrastructure for maximum control
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg hover:bg-secondary/5 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <Smartphone className="w-5 h-5 text-secondary" />
                        <div className="font-semibold">Edge Computing</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Run directly on user devices for privacy and speed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get Started with Your Personal Agent SDK</CardTitle>
                <CardDescription className="text-center text-base">
                  Everything you need to build, deploy, and scale your intelligent automation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <Download className="w-12 h-12 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Download SDK</h4>
                    <p className="text-sm text-muted-foreground mb-4">Get the development kit and documentation</p>
                    <Button variant="outline" className="w-full">Download</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Code className="w-12 h-12 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">API Documentation</h4>
                    <p className="text-sm text-muted-foreground mb-4">Comprehensive guides and examples</p>
                    <Button variant="outline" className="w-full">View Docs</Button>
                  </div>
                  <div className="text-center p-6 border rounded-lg">
                    <Users className="w-12 h-12 text-accent mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Developer Community</h4>
                    <p className="text-sm text-muted-foreground mb-4">Join thousands of developers building agents</p>
                    <Button variant="outline" className="w-full">Join Community</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Connectivity;