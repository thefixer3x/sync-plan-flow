const Integrations = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Integrations & Connections</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Calendar Services</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Google Calendar</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Outlook Calendar</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Apple Calendar</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Communication</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Gmail</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Slack</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Microsoft Teams</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>WhatsApp Business</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Financial</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Bank Account (HSBC)</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>PayPal</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Stripe</span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Productivity Tools</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">Notion</p>
                  <p className="text-sm text-muted-foreground">Import databases & create tasks</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Connect</button>
              </div>
              <div className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">Trello</p>
                  <p className="text-sm text-muted-foreground">Sync boards & cards</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Connect</button>
              </div>
              <div className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">Todoist</p>
                  <p className="text-sm text-muted-foreground">Import existing tasks</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Connect</button>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Health & Fitness</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">Apple Health</p>
                  <p className="text-sm text-muted-foreground">Track activity & sleep</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Connect</button>
              </div>
              <div className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">Fitbit</p>
                  <p className="text-sm text-muted-foreground">Monitor fitness goals</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Connect</button>
              </div>
              <div className="flex justify-between items-center p-3 border border-border rounded">
                <div>
                  <p className="font-medium">MyFitnessPal</p>
                  <p className="text-sm text-muted-foreground">Nutrition tracking</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Connect</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Custom AI Agent Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Bring Your Own Keys</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">OpenAI API Key</label>
                  <input type="password" placeholder="sk-..." className="w-full border border-border rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Anthropic API Key</label>
                  <input type="password" placeholder="Optional" className="w-full border border-border rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Google AI API Key</label>
                  <input type="password" placeholder="Optional" className="w-full border border-border rounded px-3 py-2 mt-1" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">AI Agent Settings</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Proactive Notifications</span>
                  <input type="checkbox" checked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Voice Responses</span>
                  <input type="checkbox" checked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Learning Mode</span>
                  <input type="checkbox" checked className="rounded" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Auto-scheduling</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;