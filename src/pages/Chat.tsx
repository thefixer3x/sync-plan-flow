const Chat = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Conversation Hub</h1>
        
        <div className="border border-border rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Current Conversation</h3>
          
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            <div className="flex">
              <div className="bg-muted p-3 rounded-lg max-w-xs">
                <p className="text-sm">You: I need to buy a new laptop but only have £1000. Should I get a loan or sacrifice daily consumption?</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                <p className="text-sm">AI: Let me analyze your financial situation. Based on your spending patterns, I recommend reducing daily coffee purchases (£120/month) and subscription services (£80/month) for 6 months. This gives you £1200 without debt.</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="bg-muted p-3 rounded-lg max-w-xs">
                <p className="text-sm">You: What about my productivity during this period?</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-xs">
                <p className="text-sm">AI: I'll schedule your most important work during peak energy hours and block time for exercise to maintain productivity. Would you like me to create this optimization plan?</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type or speak your message..."
                className="flex-1 border border-border rounded-lg px-3 py-2"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Send</button>
              <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">🎤</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Conversation History</h3>
            <div className="space-y-2">
              <p className="text-sm">• Budget planning discussion (2 hours ago)</p>
              <p className="text-sm">• Project deadline analysis (Yesterday)</p>
              <p className="text-sm">• Health routine optimization (2 days ago)</p>
              <p className="text-sm">• Travel planning session (1 week ago)</p>
            </div>
          </div>

          <div className="border border-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">AI Capabilities</h3>
            <div className="space-y-2">
              <p className="text-sm">✓ Voice conversation</p>
              <p className="text-sm">✓ Financial planning</p>
              <p className="text-sm">✓ Schedule optimization</p>
              <p className="text-sm">✓ Decision support</p>
              <p className="text-sm">✓ Context memory</p>
              <p className="text-sm">✓ Proactive suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;