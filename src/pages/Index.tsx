import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">AI Productivity Companion</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your intelligent personal assistant that thinks, plans, and executes - 
            so you can focus on what matters most. No dashboards, no manual input, 
            just conversation and results.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/chat" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium">
              Start Conversation
            </Link>
            <Link to="/dashboard" className="border border-border px-8 py-3 rounded-lg font-medium">
              View Dashboard
            </Link>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Conversational Intelligence</h3>
            <p className="text-muted-foreground mb-4">
              "I need a laptop but only have £1000" - AI analyzes your finances, 
              suggests optimization, and creates action plans through natural conversation.
            </p>
            <Link to="/chat" className="text-primary text-sm font-medium">Try AI Chat →</Link>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Always-On Orchestration</h3>
            <p className="text-muted-foreground mb-4">
              24/7 background monitoring of your calendar, emails, deadlines, and finances. 
              AI acts proactively before problems arise.
            </p>
            <Link to="/orchestration" className="text-primary text-sm font-medium">See Orchestration →</Link>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Predictive Analytics</h3>
            <p className="text-muted-foreground mb-4">
              Learn your patterns, predict project delays, optimize your energy levels, 
              and suggest improvements before you even realize you need them.
            </p>
            <Link to="/analytics" className="text-primary text-sm font-medium">View Analytics →</Link>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Zero Manual Input</h3>
            <p className="text-muted-foreground mb-4">
              Speak naturally, email gets parsed, calendar auto-optimized. 
              AI handles the tedious stuff while you focus on decisions and execution.
            </p>
            <Link to="/integrations" className="text-primary text-sm font-medium">See Integrations →</Link>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Bring Your Own AI</h3>
            <p className="text-muted-foreground mb-4">
              Use your own API keys and AI models. Customize the intelligence layer 
              while we handle orchestration and integrations.
            </p>
            <Link to="/settings" className="text-primary text-sm font-medium">Configure AI →</Link>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Enterprise Ready</h3>
            <p className="text-muted-foreground mb-4">
              Team collaboration, advanced security, custom integrations, 
              and white-label options for organizations.
            </p>
            <Link to="/settings" className="text-primary text-sm font-medium">View Plans →</Link>
          </div>
        </div>

        {/* Use Case Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Real Conversation Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-border p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Financial Planning</h4>
              <div className="space-y-2 text-sm">
                <p><strong>You:</strong> "I want a new laptop but only have £1000. Should I get a loan?"</p>
                <p><strong>AI:</strong> "Based on your spending patterns, cutting coffee purchases (£120/month) and subscriptions (£80/month) for 6 months gives you £1200 without debt. Shall I optimize your schedule to maintain productivity during this period?"</p>
              </div>
            </div>

            <div className="border border-border p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Health Optimization</h4>
              <div className="space-y-2 text-sm">
                <p><strong>AI:</strong> "You've missed exercise for 2 days. Should I remove it or reschedule?"</p>
                <p><strong>You:</strong> "Reschedule but I'm swamped this week."</p>
                <p><strong>AI:</strong> "I'll book 20-minute walks during your coffee breaks and move one meeting to create a 40-minute gym slot Thursday."</p>
              </div>
            </div>

            <div className="border border-border p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Project Management</h4>
              <div className="space-y-2 text-sm">
                <p><strong>AI:</strong> "Your website project is 78% complete but trending 3 days behind schedule. The client presentation is Friday."</p>
                <p><strong>You:</strong> "What can we do?"</p>
                <p><strong>AI:</strong> "I can reschedule non-critical meetings, block focus time tomorrow morning, and suggest we present the core features with a follow-up for remaining items."</p>
              </div>
            </div>

            <div className="border border-border p-6 rounded-lg">
              <h4 className="font-semibold mb-3">Daily Flow</h4>
              <div className="space-y-2 text-sm">
                <p><strong>AI:</strong> "Good morning! Payment due today for utilities (£187). Account balance sufficient. Your energy is highest 9-11 AM - I've blocked that time for the proposal draft. Lunch with Sarah moved to 12:30 PM due to her schedule change."</p>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Overview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">The Complete System</h2>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Unlike traditional task managers that require constant input, our AI Productivity Companion 
            operates as your personal operating system - always listening, always thinking, always optimizing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/chat" className="border border-border p-4 rounded-lg hover:border-primary transition-colors">
              <h4 className="font-semibold">Conversational Interface</h4>
              <p className="text-sm text-muted-foreground">Natural language interaction</p>
            </Link>
            <Link to="/orchestration" className="border border-border p-4 rounded-lg hover:border-primary transition-colors">
              <h4 className="font-semibold">Background Orchestration</h4>
              <p className="text-sm text-muted-foreground">Always-on monitoring & automation</p>
            </Link>
            <Link to="/integrations" className="border border-border p-4 rounded-lg hover:border-primary transition-colors">
              <h4 className="font-semibold">Universal Integrations</h4>
              <p className="text-sm text-muted-foreground">Connect all your tools & data</p>
            </Link>
            <Link to="/analytics" className="border border-border p-4 rounded-lg hover:border-primary transition-colors">
              <h4 className="font-semibold">Predictive Intelligence</h4>
              <p className="text-sm text-muted-foreground">Learn, predict, optimize</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;