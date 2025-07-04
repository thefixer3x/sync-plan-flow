const Analytics = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Analytics & Insights</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="border border-border p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">87%</h3>
            <p className="text-muted-foreground">Task Completion Rate</p>
          </div>
          <div className="border border-border p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">6.2h</h3>
            <p className="text-muted-foreground">Avg Daily Productivity</p>
          </div>
          <div className="border border-border p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-muted-foreground">AI Interventions</p>
          </div>
          <div className="border border-border p-6 rounded-lg text-center">
            <h3 className="text-2xl font-bold">+23%</h3>
            <p className="text-muted-foreground">Efficiency Gain</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Productivity Patterns</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Peak Performance Time</p>
                <p className="text-muted-foreground">9:00 AM - 11:30 AM</p>
              </div>
              <div>
                <p className="text-sm font-medium">Most Productive Day</p>
                <p className="text-muted-foreground">Tuesday (8.4h avg focus)</p>
              </div>
              <div>
                <p className="text-sm font-medium">Optimal Break Frequency</p>
                <p className="text-muted-foreground">Every 45 minutes</p>
              </div>
              <div>
                <p className="text-sm font-medium">Energy Levels</p>
                <p className="text-muted-foreground">High: Morning | Low: 2-4 PM</p>
              </div>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Goal Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Complete Website Redesign</span>
                  <span className="text-sm">78%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Exercise 4x per week</span>
                  <span className="text-sm">50%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Save £500 this month</span>
                  <span className="text-sm">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Weekly Trends</h3>
            <div className="space-y-2">
              <p className="text-sm">• Tasks completed: +15%</p>
              <p className="text-sm">• Focus time: +23 minutes</p>
              <p className="text-sm">• Interruptions: -8%</p>
              <p className="text-sm">• Stress level: -12%</p>
              <p className="text-sm">• Sleep quality: +18%</p>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI Recommendations</h3>
            <div className="space-y-2">
              <p className="text-sm">• Schedule deep work before 10 AM</p>
              <p className="text-sm">• Block social media 9-11 AM</p>
              <p className="text-sm">• Take lunch break at 12:30 PM</p>
              <p className="text-sm">• Exercise on Tuesday/Thursday</p>
              <p className="text-sm">• Review goals weekly on Sunday</p>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Success Predictions</h3>
            <div className="space-y-2">
              <p className="text-sm">• Website project: 95% on-time</p>
              <p className="text-sm">• Monthly savings: 88% likely</p>
              <p className="text-sm">• Fitness goals: 67% likely</p>
              <p className="text-sm">• Work-life balance: 91% improving</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;