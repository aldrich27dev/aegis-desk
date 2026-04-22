import { useState } from "react";
import { MOCK_TICKETS } from "../data/tickets";
import TicketCard from "../components/tickets/TicketCard";
import TicketDetail from "../components/tickets/TicketDetail";
import AIAnalysisPanel from "../components/ai/AIAnalysisPanel";
import AIResponseBox from "../components/ai/AIResponseBox";
import { analyzeTicketLocally } from "../utils/analyzeTicket";
import { generateResponse } from "../utils/generateResponse";

export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(MOCK_TICKETS[0]);
  
  const analysis = analyzeTicketLocally(selectedTicket.title, selectedTicket.description);
  const suggestion = generateResponse(selectedTicket);

  return (
    <div className="flex flex-col h-full gap-6">
      <header>
        <h1 className="text-2xl font-bold">Command Center</h1>
        <p className="text-zinc-500 text-sm">Monitor and resolve system-wide support requests.</p>
      </header>

      <div className="grid grid-cols-12 gap-6 h-full min-h-0">
        {/* LEFT: Ticket List (3 cols) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col min-h-0">
          <div className="overflow-y-auto pr-2 space-y-1">
            {MOCK_TICKETS.map(t => (
              <TicketCard 
                key={t.id} 
                ticket={t} 
                active={selectedTicket.id === t.id}
                onClick={() => setSelectedTicket(t)}
              />
            ))}
          </div>
        </div>

        {/* CENTER: Detail View (5 cols) */}
        <div className="col-span-12 lg:col-span-6 min-h-0">
          <TicketDetail ticket={selectedTicket} />
        </div>

        {/* RIGHT: AI Insights (3 cols) */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 min-h-0">
          <AIAnalysisPanel analysis={analysis} />
          <div className="flex-1">
            <AIResponseBox suggestion={suggestion} onSend={() => alert("Response Sent!")} />
          </div>
        </div>
      </div>
    </div>
  );
}