const Settings = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings & Preferences</h1>
        
        <div className="space-y-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI Behavior</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Communication Style</label>
                <select className="w-full border border-border rounded px-3 py-2">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Direct</option>
                  <option>Encouraging</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Interruption Level</label>
                <select className="w-full border border-border rounded px-3 py-2">
                  <option>Minimal (Urgent only)</option>
                  <option>Moderate (Important items)</option>
                  <option>High (All suggestions)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Decision Making</label>
                <select className="w-full border border-border rounded px-3 py-2">
                  <option>Always ask permission</option>
                  <option>Auto-execute low-risk actions</option>
                  <option>Auto-execute all actions</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Learning Speed</label>
                <select className="w-full border border-border rounded px-3 py-2">
                  <option>Conservative</option>
                  <option>Balanced</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Task Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified about upcoming deadlines</p>
                </div>
                <input type="checkbox" checked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">AI Suggestions</p>
                  <p className="text-sm text-muted-foreground">Receive proactive optimization tips</p>
                </div>
                <input type="checkbox" checked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Calendar Changes</p>
                  <p className="text-sm text-muted-foreground">Alert when AI modifies your schedule</p>
                </div>
                <input type="checkbox" checked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Financial Alerts</p>
                  <p className="text-sm text-muted-foreground">Payment reminders and budget warnings</p>
                </div>
                <input type="checkbox" checked className="rounded" />
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Privacy & Security</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Data Encryption</p>
                  <p className="text-sm text-muted-foreground">End-to-end encryption for all conversations</p>
                </div>
                <span className="text-green-500 text-sm">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Local Processing</p>
                  <p className="text-sm text-muted-foreground">Process sensitive data locally when possible</p>
                </div>
                <input type="checkbox" checked className="rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Data Retention</p>
                  <p className="text-sm text-muted-foreground">How long to keep conversation history</p>
                </div>
                <select className="border border-border rounded px-3 py-1">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                  <option>Forever</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Analytics Sharing</p>
                  <p className="text-sm text-muted-foreground">Share anonymized usage data to improve AI</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Account & Billing</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Professional AI Partner</p>
                </div>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">Upgrade</button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Usage This Month</p>
                  <p className="text-sm text-muted-foreground">2,847 AI interactions / 5,000 limit</p>
                </div>
                <span className="text-sm">57% used</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Next Billing Date</p>
                  <p className="text-sm text-muted-foreground">January 15, 2025</p>
                </div>
                <span className="text-sm">£75.00</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded">Save Changes</button>
            <button className="border border-border px-6 py-2 rounded">Reset to Defaults</button>
            <button className="text-destructive px-6 py-2">Export Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;