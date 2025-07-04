import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Productivity Companion - Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <p>• Tasks Due Today: 5</p>
              <p>• Overdue Items: 2</p>
              <p>• Completed This Week: 12</p>
              <p>• AI Interventions: 8</p>
            </div>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Current Focus</h3>
            <div className="space-y-2">
              <p>• Active Project: Website Redesign</p>
              <p>• Time Block: Deep Work (2hrs left)</p>
              <p>• Next Meeting: 3:30 PM</p>
              <p>• Energy Level: High</p>
            </div>
          </div>
          
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">AI Recommendations</h3>
            <div className="space-y-2">
              <p>• Move meeting to tomorrow</p>
              <p>• Take a break in 45 mins</p>
              <p>• Review budget allocation</p>
              <p>• Schedule gym session</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>9:00 AM - Team Standup</span>
                <span className="text-sm text-muted-foreground">30 min</span>
              </div>
              <div className="flex justify-between">
                <span>10:00 AM - Deep Work Block</span>
                <span className="text-sm text-muted-foreground">3 hrs</span>
              </div>
              <div className="flex justify-between">
                <span>2:00 PM - Lunch Break</span>
                <span className="text-sm text-muted-foreground">1 hr</span>
              </div>
              <div className="flex justify-between">
                <span>3:30 PM - Client Call</span>
                <span className="text-sm text-muted-foreground">45 min</span>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Recent AI Actions</h3>
            <div className="space-y-3">
              <p className="text-sm">• Rescheduled dentist appointment</p>
              <p className="text-sm">• Added grocery shopping to weekend</p>
              <p className="text-sm">• Reminded about payment deadline</p>
              <p className="text-sm">• Suggested project priority change</p>
              <p className="text-sm">• Blocked focus time for report</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;