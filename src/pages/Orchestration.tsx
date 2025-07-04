const Orchestration = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Orchestration Center</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Active Monitoring</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Calendar Events</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Email Inbox</span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Bank Notifications</span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Project Deadlines</span>
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Scheduled Triggers</h3>
            <div className="space-y-2">
              <p className="text-sm">• Daily review: 8:00 AM</p>
              <p className="text-sm">• Payment check: Every Monday</p>
              <p className="text-sm">• Exercise reminder: 6:00 PM</p>
              <p className="text-sm">• Weekly planning: Sunday 7 PM</p>
              <p className="text-sm">• Energy assessment: Every 2 hours</p>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI Agent Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Uptime</span>
                <span className="text-green-500">99.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time</span>
                <span>1.2s avg</span>
              </div>
              <div className="flex justify-between">
                <span>Actions Today</span>
                <span>47</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate</span>
                <span className="text-green-500">94%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Recent Automated Actions</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-3">
                <p className="text-sm font-medium">Payment Reminder Sent</p>
                <p className="text-xs text-muted-foreground">Utility bill due in 2 days - 10:30 AM</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm font-medium">Calendar Optimized</p>
                <p className="text-xs text-muted-foreground">Moved meeting to accommodate focus time - 9:15 AM</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="text-sm font-medium">Exercise Reminder</p>
                <p className="text-xs text-muted-foreground">Missed 2 days, suggested 30min walk - 8:45 AM</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3">
                <p className="text-sm font-medium">Email Parsed</p>
                <p className="text-xs text-muted-foreground">Created task from client email - 8:20 AM</p>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Orchestration Rules</h3>
            <div className="space-y-3">
              <div className="border border-border p-3 rounded">
                <p className="text-sm font-medium">IF: Email contains "urgent" + deadline</p>
                <p className="text-xs text-muted-foreground">THEN: Create high-priority task + notify immediately</p>
              </div>
              <div className="border border-border p-3 rounded">
                <p className="text-sm font-medium">IF: No exercise for 48 hours</p>
                <p className="text-xs text-muted-foreground">THEN: Suggest activity + block calendar time</p>
              </div>
              <div className="border border-border p-3 rounded">
                <p className="text-sm font-medium">IF: Payment due in 3 days</p>
                <p className="text-xs text-muted-foreground">THEN: Check account balance + send reminder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orchestration;