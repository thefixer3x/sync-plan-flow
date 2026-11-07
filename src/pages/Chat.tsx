import { Card } from "@/components/ui/card";
import { ConciergeChat, ConciergeMark } from "@/components/concierge/ConciergeChat";

const Chat = () => (
  <div className="h-[calc(100vh-3.5rem)] md:h-screen flex flex-col">
    <div className="p-6 pb-0 flex items-center gap-3">
      <ConciergeMark />
      <div>
        <h1 className="text-2xl font-bold">Flow</h1>
        <p className="text-sm text-muted-foreground">Your productivity concierge — plans your day and keeps your board in sync.</p>
      </div>
    </div>
    <div className="flex-1 flex flex-col p-4 md:p-6 min-h-0">
      <Card className="flex-1 flex flex-col min-h-0 overflow-hidden max-w-4xl w-full mx-auto">
        <ConciergeChat />
      </Card>
    </div>
  </div>
);

export default Chat;
