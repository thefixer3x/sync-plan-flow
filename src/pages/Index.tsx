import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Circle } from "lucide-react";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "hero",
      title: "AI Productivity Companion",
      subtitle: "The Orchestration Layer That Changes Everything",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your Intelligent Productivity Operating System</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              The world's first AI-powered orchestration layer that monitors, learns, and acts across your entire productivity ecosystem. 
              No migration required. No workflow changes. Just seamless intelligence that makes you 10x more productive.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Circle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Always Watching</h3>
              <p className="text-sm text-muted-foreground">24/7 monitoring of your productivity patterns</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Circle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Smart Triggers</h3>
              <p className="text-sm text-muted-foreground">Intelligent automation based on context</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Circle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Zero Friction</h3>
              <p className="text-sm text-muted-foreground">Works with your existing tools seamlessly</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "orchestration",
      title: "The Orchestration Layer",
      subtitle: "Our Core IP: The Intelligence That Never Sleeps",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">The Brain Behind Your Productivity</h2>
            <p className="text-lg text-muted-foreground">
              This is our secret sauce - the middleware that makes everything else possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Real-Time Monitoring</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Calendar Events:</strong> Detects conflicts, energy levels, meeting patterns
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Email Patterns:</strong> Urgent detection, task extraction, sentiment analysis
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Financial Signals:</strong> Payment deadlines, budget alerts, cash flow
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Health & Energy:</strong> Workout patterns, sleep quality, stress levels
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Intelligent Triggers</h3>
              <div className="space-y-3">
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Context-Aware Actions</p>
                  <p className="text-xs text-muted-foreground">Triggers AI only when necessary, with full context</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Pattern Recognition</p>
                  <p className="text-xs text-muted-foreground">Learns from your behavior to predict needs</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Multi-Source Fusion</p>
                  <p className="text-xs text-muted-foreground">Combines data from all tools for smart decisions</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <p className="text-sm font-medium">Proactive Intervention</p>
                  <p className="text-xs text-muted-foreground">Acts before problems become critical</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "interoperability",
      title: "Universal Interoperability",
      subtitle: "Connect Everything, Change Nothing",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Productivity Hub</h2>
            <p className="text-lg text-muted-foreground">
              One interface to rule them all. Keep using your favorite tools while we orchestrate everything behind the scenes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Calendar & Scheduling</h3>
              <ul className="space-y-2 text-sm">
                <li>• Google Calendar sync</li>
                <li>• Outlook integration</li>
                <li>• Smart scheduling suggestions</li>
                <li>• Conflict resolution</li>
                <li>• Energy-based scheduling</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Task & Project Management</h3>
              <ul className="space-y-2 text-sm">
                <li>• Notion workspace sync</li>
                <li>• Trello board integration</li>
                <li>• ClickUp project tracking</li>
                <li>• Asana workflow automation</li>
                <li>• GitHub issue management</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Communication</h3>
              <ul className="space-y-2 text-sm">
                <li>• Slack message parsing</li>
                <li>• Teams integration</li>
                <li>• Email automation</li>
                <li>• WhatsApp notifications</li>
                <li>• Discord activity tracking</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Smart Data Normalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Unified Task Model</h4>
                <p className="text-sm text-muted-foreground">All tasks from different platforms mapped to one schema</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Cross-Platform Analytics</h4>
                <p className="text-sm text-muted-foreground">Holistic view of productivity across all tools</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Bi-Directional Sync</h4>
                <p className="text-sm text-muted-foreground">Changes reflect everywhere in real-time</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Conflict Resolution</h4>
                <p className="text-sm text-muted-foreground">Smart handling of duplicate or conflicting data</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "conversational",
      title: "Conversational AI Hub",
      subtitle: "Natural Language Productivity Planning",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Your AI Productivity Coach</h2>
            <p className="text-lg text-muted-foreground">
              Complex decisions made simple through natural conversation. Your AI understands context, priorities, and constraints.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Conversation Scenarios</h3>
              <div className="space-y-3">
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Financial Planning</h4>
                  <p className="text-sm text-muted-foreground">
                    "I need a new laptop but only have £1000. Should I get a loan or reduce spending?"
                  </p>
                </div>
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Time Management</h4>
                  <p className="text-sm text-muted-foreground">
                    "I have three deadlines next week. How should I prioritize and schedule them?"
                  </p>
                </div>
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Energy Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    "I feel burned out. Can you reorganize my week for better work-life balance?"
                  </p>
                </div>
                <div className="border border-border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Career Decisions</h4>
                  <p className="text-sm text-muted-foreground">
                    "Should I take this job offer? Help me analyze the pros and cons."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI Capabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Multi-modal conversation (text, voice, images)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Context memory across sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Real-time data integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Proactive suggestions and interventions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Complex reasoning and analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Personalized recommendations</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 border border-border rounded-lg">
                <h4 className="font-medium mb-2">Conversation History</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Budget planning discussion (2 hours ago)</li>
                  <li>• Project deadline analysis (Yesterday)</li>
                  <li>• Health routine optimization (2 days ago)</li>
                  <li>• Travel planning session (1 week ago)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "features",
      title: "Core Features & Capabilities",
      subtitle: "Everything You Need for Peak Productivity",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Smart Task Management</h3>
              <ul className="space-y-2 text-sm">
                <li>• NLP task creation from emails/messages</li>
                <li>• AI-powered priority suggestions</li>
                <li>• Smart due date recommendations</li>
                <li>• Workload balancing algorithms</li>
                <li>• Dependency tracking</li>
                <li>• Time estimation learning</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Intelligent Automation</h3>
              <ul className="space-y-2 text-sm">
                <li>• Calendar optimization</li>
                <li>• Payment reminder system</li>
                <li>• Email parsing and categorization</li>
                <li>• Health & fitness tracking</li>
                <li>• Travel planning assistance</li>
                <li>• Expense categorization</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Productivity Analytics</h3>
              <ul className="space-y-2 text-sm">
                <li>• Time tracking across platforms</li>
                <li>• Energy level monitoring</li>
                <li>• Focus pattern analysis</li>
                <li>• Goal achievement tracking</li>
                <li>• Productivity trend insights</li>
                <li>• Performance optimization tips</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Optimization</h3>
              <ul className="space-y-2 text-sm">
                <li>• Circadian rhythm scheduling</li>
                <li>• Energy-based task allocation</li>
                <li>• Stress level monitoring</li>
                <li>• Burnout prevention</li>
                <li>• Work-life balance scoring</li>
                <li>• Habit formation support</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Team Collaboration</h3>
              <ul className="space-y-2 text-sm">
                <li>• Shared workspace intelligence</li>
                <li>• Team productivity insights</li>
                <li>• Collaborative decision making</li>
                <li>• Resource allocation optimization</li>
                <li>• Meeting efficiency analysis</li>
                <li>• Communication pattern insights</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security & Compliance</h3>
              <ul className="space-y-2 text-sm">
                <li>• End-to-end encryption</li>
                <li>• GDPR compliance</li>
                <li>• SOC 2 Type II certification</li>
                <li>• Role-based access control</li>
                <li>• Audit trail logging</li>
                <li>• Data residency options</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "architecture",
      title: "Technical Architecture",
      subtitle: "Built for Scale, Security, and Performance",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Enterprise-Grade Infrastructure</h2>
            <p className="text-lg text-muted-foreground">
              Scalable, secure, and intelligent architecture designed for global deployment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Core Architecture</h3>
              <div className="space-y-3">
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Orchestration Engine</h4>
                  <p className="text-sm text-muted-foreground">Real-time event processing and intelligent trigger system</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">AI Model Layer</h4>
                  <p className="text-sm text-muted-foreground">Multi-model AI system with specialized reasoning capabilities</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Integration Hub</h4>
                  <p className="text-sm text-muted-foreground">Universal API gateway with intelligent data normalization</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Data Pipeline</h4>
                  <p className="text-sm text-muted-foreground">Stream processing for real-time insights and actions</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Infrastructure & Security</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Cloud-Native</h4>
                  <p className="text-sm text-muted-foreground">Multi-cloud deployment with auto-scaling capabilities</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Zero-Trust Security</h4>
                  <p className="text-sm text-muted-foreground">End-to-end encryption with role-based access control</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">Edge Processing</h4>
                  <p className="text-sm text-muted-foreground">Distributed intelligence for reduced latency</p>
                </div>
                <div className="border border-border p-3 rounded">
                  <h4 className="font-medium mb-1">High Availability</h4>
                  <p className="text-sm text-muted-foreground">99.99% uptime with intelligent failover systems</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Response Time</h4>
              <p className="text-2xl font-bold text-primary">&lt; 200ms</p>
              <p className="text-sm text-muted-foreground">Average API response time</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Uptime</h4>
              <p className="text-2xl font-bold text-primary">99.99%</p>
              <p className="text-sm text-muted-foreground">Service availability guarantee</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Data Processing</h4>
              <p className="text-2xl font-bold text-primary">10M+</p>
              <p className="text-sm text-muted-foreground">Events processed per day</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "business",
      title: "Business Model & Pricing",
      subtitle: "Flexible Solutions for Every Scale",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Monetization Strategy</h2>
            <p className="text-lg text-muted-foreground">
              Multiple revenue streams designed for sustainable growth and customer value.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Personal</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">£29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm mb-6">
                <li>• Core orchestration features</li>
                <li>• 5 tool integrations</li>
                <li>• Basic AI conversations</li>
                <li>• Personal analytics</li>
                <li>• Mobile app access</li>
                <li>• Email support</li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Perfect for individuals and freelancers
              </div>
            </div>
            
            <div className="border border-primary p-6 rounded-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">£79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm mb-6">
                <li>• All Personal features</li>
                <li>• Unlimited integrations</li>
                <li>• Advanced AI capabilities</li>
                <li>• Team collaboration</li>
                <li>• Custom workflows</li>
                <li>• Priority support</li>
                <li>• API access</li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Ideal for small teams and businesses
              </div>
            </div>
            
            <div className="border border-border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <ul className="space-y-2 text-sm mb-6">
                <li>• All Professional features</li>
                <li>• White-label solutions</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
                <li>• On-premise deployment</li>
                <li>• SLA guarantees</li>
                <li>• Training & consulting</li>
              </ul>
              <div className="text-sm text-muted-foreground">
                Scalable solutions for large organizations
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold">Revenue Streams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Subscription Revenue</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Monthly/annual subscriptions</li>
                  <li>• Usage-based pricing for enterprise</li>
                  <li>• Add-on feature packages</li>
                  <li>• Premium integration tiers</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Service Revenue</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Implementation services</li>
                  <li>• Custom integration development</li>
                  <li>• Training and consulting</li>
                  <li>• White-label licensing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "roadmap",
      title: "Implementation Roadmap",
      subtitle: "Strategic Development Plan",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Phase-by-Phase Development</h2>
            <p className="text-lg text-muted-foreground">
              Strategic roadmap for building and scaling the AI Productivity Companion platform.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border border-border p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                <h3 className="text-xl font-semibold">MVP Phase (Months 1-3)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Core Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Basic orchestration engine</li>
                    <li>• 3-5 key integrations (Google, Slack, Notion)</li>
                    <li>• Simple conversational interface</li>
                    <li>• Personal dashboard</li>
                    <li>• Basic task management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Success Metrics</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 100 beta users</li>
                    <li>• 80% daily active usage</li>
                    <li>• 5+ automated actions per user/day</li>
                    <li>• 90% uptime</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-border p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                <h3 className="text-xl font-semibold">Growth Phase (Months 4-8)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Enhanced Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Advanced AI reasoning</li>
                    <li>• 15+ platform integrations</li>
                    <li>• Team collaboration features</li>
                    <li>• Advanced analytics</li>
                    <li>• Mobile applications</li>
                    <li>• API marketplace</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Business Goals</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 1,000 paying customers</li>
                    <li>• £50K MRR</li>
                    <li>• 95% customer satisfaction</li>
                    <li>• Series A funding</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border border-border p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                <h3 className="text-xl font-semibold">Scale Phase (Months 9-18)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Enterprise Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• White-label solutions</li>
                    <li>• Enterprise security & compliance</li>
                    <li>• Custom AI model training</li>
                    <li>• Advanced workflow automation</li>
                    <li>• Multi-tenant architecture</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Market Expansion</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 10,000+ users</li>
                    <li>• £500K MRR</li>
                    <li>• International markets</li>
                    <li>• Strategic partnerships</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background">
      {/* Slide Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Slide Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {currentSlideData.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {currentSlideData.subtitle}
            </p>
          </div>

          {/* Slide Content */}
          <div className="max-w-7xl mx-auto">
            {currentSlideData.content}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 bg-background/80 backdrop-blur-sm border border-border rounded-full px-6 py-3">
          <button
            onClick={prevSlide}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium">
            {currentSlideData.title}
          </span>
          
          <button
            onClick={nextSlide}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`block w-3 h-8 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted hover:bg-muted-foreground/20'
              }`}
              title={slide.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;