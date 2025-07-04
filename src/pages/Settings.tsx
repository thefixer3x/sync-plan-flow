import { useState } from "react";
import { 
  User, 
  Settings as SettingsIcon, 
  FileText, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Download, 
  Heart,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  BookOpen,
  HelpCircle,
  Info,
  Lock,
  Eye,
  Volume2,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Zap,
  MessageSquare,
  Calendar,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  });
  const [privacy, setPrivacy] = useState({
    analytics: false,
    marketing: false,
    dataSharing: false
  });
  
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Settings & Information
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Configure your AI Productivity Companion, learn more about us, and access documentation
          </p>
        </div>

        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* About Us Tab */}
          <TabsContent value="about" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Zap className="w-8 h-8 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    We're building the world's most intelligent productivity orchestration platform - 
                    not to replace your existing apps, but to make them work together seamlessly through AI.
                  </p>
                  <p className="text-muted-foreground">
                    Just like how you can ask our AI to search for currency exchange rates, order your favorite snacks, 
                    or manage complex tasks across multiple platforms - we believe AI should handle the coordination 
                    while you focus on what matters most.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Real-world Task Completion</Badge>
                    <Badge variant="secondary">Cross-platform Integration</Badge>
                    <Badge variant="secondary">Privacy-first Design</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Heart className="w-8 h-8 text-secondary" />
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-secondary mt-1" />
                      <div>
                        <h4 className="font-semibold">Privacy by Design</h4>
                        <p className="text-sm text-muted-foreground">Your data belongs to you, stored where you want it</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-secondary mt-1" />
                      <div>
                        <h4 className="font-semibold">Universal Connectivity</h4>
                        <p className="text-sm text-muted-foreground">Connect any app, any service, any workflow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-secondary mt-1" />
                      <div>
                        <h4 className="font-semibold">Human-Centric AI</h4>
                        <p className="text-sm text-muted-foreground">AI that enhances human capability, not replaces it</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Meet the Team</CardTitle>
                <CardDescription className="text-center">
                  The minds behind your AI Productivity Companion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border rounded-lg">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Alex Chen</h4>
                    <p className="text-sm text-muted-foreground mb-3">Founder & CEO</p>
                    <p className="text-xs">Former Google AI researcher passionate about making productivity tools that actually work for humans.</p>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-secondary" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Sarah Kim</h4>
                    <p className="text-sm text-muted-foreground mb-3">CTO & Co-founder</p>
                    <p className="text-xs">Infrastructure expert who built the orchestration engine that powers seamless app integrations.</p>
                  </div>
                  
                  <div className="text-center p-6 border rounded-lg">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-accent" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Marcus Johnson</h4>
                    <p className="text-sm text-muted-foreground mb-3">Head of AI</p>
                    <p className="text-xs">PhD in Machine Learning, focused on building AI that understands context and user intent.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-accent" />
                        <span>hello@aiproductivity.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-accent" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-accent" />
                        <span>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Follow Us</h4>
                    <div className="flex gap-4">
                      <Button variant="outline" size="icon">
                        <Twitter className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Linkedin className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Github className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-6 h-6" />
                    AI Behavior
                  </CardTitle>
                  <CardDescription>Configure how your AI assistant behaves</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Communication Style</label>
                    <Select defaultValue="professional">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="encouraging">Encouraging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Interruption Level</label>
                    <Select defaultValue="moderate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal (Urgent only)</SelectItem>
                        <SelectItem value="moderate">Moderate (Important items)</SelectItem>
                        <SelectItem value="high">High (All suggestions)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Decision Making</label>
                    <Select defaultValue="ask">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ask">Always ask permission</SelectItem>
                        <SelectItem value="auto-low">Auto-execute low-risk actions</SelectItem>
                        <SelectItem value="auto-all">Auto-execute all actions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-6 h-6" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize the look and feel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Theme</label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Size</label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reduce animations</p>
                      <p className="text-sm text-muted-foreground">Minimize motion for accessibility</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Notifications
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email notifications</p>
                        <p className="text-sm text-muted-foreground">Task reminders and updates</p>
                      </div>
                      <Switch 
                        checked={notifications.email} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push notifications</p>
                        <p className="text-sm text-muted-foreground">Instant alerts on your device</p>
                      </div>
                      <Switch 
                        checked={notifications.push} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Desktop notifications</p>
                        <p className="text-sm text-muted-foreground">Browser notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.desktop} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, desktop: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS notifications</p>
                        <p className="text-sm text-muted-foreground">Text message alerts</p>
                      </div>
                      <Switch 
                        checked={notifications.sms} 
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline">Reset to Defaults</Button>
              <Button variant="destructive">Export Data</Button>
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>Learn the basics of your AI companion</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Quick setup guide</li>
                    <li>• First conversations</li>
                    <li>• Basic commands</li>
                    <li>• Common workflows</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-6 h-6 text-secondary" />
                    Integrations
                  </CardTitle>
                  <CardDescription>Connect your favorite apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Supported platforms</li>
                    <li>• Setup instructions</li>
                    <li>• API documentation</li>
                    <li>• Troubleshooting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-accent" />
                    Advanced Features
                  </CardTitle>
                  <CardDescription>Master your productivity workflow</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Custom automations</li>
                    <li>• Voice commands</li>
                    <li>• Workflow templates</li>
                    <li>• Power user tips</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" />
                    API Reference
                  </CardTitle>
                  <CardDescription>Developer documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• REST API endpoints</li>
                    <li>• SDK documentation</li>
                    <li>• Code examples</li>
                    <li>• Rate limits</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-secondary" />
                    FAQ
                  </CardTitle>
                  <CardDescription>Frequently asked questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Common issues</li>
                    <li>• Account management</li>
                    <li>• Billing questions</li>
                    <li>• Feature requests</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover-scale transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-6 h-6 text-accent" />
                    Downloads
                  </CardTitle>
                  <CardDescription>Apps and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Mobile apps</li>
                    <li>• Desktop clients</li>
                    <li>• Browser extensions</li>
                    <li>• Templates</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Need More Help?</CardTitle>
                <CardDescription className="text-center">
                  Can't find what you're looking for? Our support team is here to help.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center gap-4">
                <Button>Contact Support</Button>
                <Button variant="outline">Join Community</Button>
                <Button variant="outline">Schedule Demo</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Data Privacy
                </CardTitle>
                <CardDescription>Control how your data is handled</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data encryption</p>
                        <p className="text-sm text-muted-foreground">End-to-end encryption for all data</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600">Enabled</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Local processing</p>
                        <p className="text-sm text-muted-foreground">Process sensitive data locally</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Anonymous analytics</p>
                        <p className="text-sm text-muted-foreground">Help improve our service</p>
                      </div>
                      <Switch 
                        checked={privacy.analytics} 
                        onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, analytics: checked }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Data retention</label>
                      <Select defaultValue="90days">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30days">30 days</SelectItem>
                          <SelectItem value="90days">90 days</SelectItem>
                          <SelectItem value="1year">1 year</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Data export format</label>
                      <Select defaultValue="json">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">Data Rights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Data Usage
                    </Button>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Protect your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Two-factor Authentication</label>
                      <Button variant="outline" className="w-full justify-start">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Active Sessions</label>
                      <Button variant="outline" className="w-full justify-start">
                        Manage Sessions
                      </Button>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">API Keys</label>
                      <Button variant="outline" className="w-full justify-start">
                        Manage API Keys
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-6 h-6" />
                    Get Help
                  </CardTitle>
                  <CardDescription>Multiple ways to get assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule a Call
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Knowledge Base
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-6 h-6" />
                    System Status
                  </CardTitle>
                  <CardDescription>Current system health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>API Services</span>
                    </div>
                    <Badge variant="secondary" className="text-green-600">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>AI Processing</span>
                    </div>
                    <Badge variant="secondary" className="text-green-600">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Integrations</span>
                    </div>
                    <Badge variant="secondary" className="text-green-600">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Mobile App</span>
                    </div>
                    <Badge variant="secondary" className="text-yellow-600">Maintenance</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Help us improve your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Feedback Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="improvement">Improvement</SelectItem>
                        <SelectItem value="general">General Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <textarea 
                    className="w-full min-h-[100px] p-3 border border-border rounded-lg resize-none"
                    placeholder="Tell us more about your feedback..."
                  />
                </div>
                <Button>Submit Feedback</Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center">Community & Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <User className="w-6 h-6" />
                    <span>Discord Community</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Github className="w-6 h-6" />
                    <span>GitHub</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <FileText className="w-6 h-6" />
                    <span>Release Notes</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <BookOpen className="w-6 h-6" />
                    <span>Blog</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;