import { useState } from 'react';
import TicketCard from '../components/tickets/TicketCard';
import TicketDetail from '../components/tickets/TicketDetail';
import { mockTickets } from '../data/mockTickets';
import { ArrowLeft, ListFilter, CheckCircle2, CircleDot, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Receive addNotification as a prop
export default function TicketsPage({ addNotification }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTickets = mockTickets.filter(ticket => {
    if (activeFilter === 'All') return true;
    return ticket.status === activeFilter;
  });

  const filterOptions = [
    { label: 'All', icon: LayoutGrid },
    { label: 'Open', icon: CircleDot },
    { label: 'Resolved', icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 h-full min-h-0 gap-0 -m-6 overflow-hidden bg-brand-bg">
      <div className={`
        ${selectedTicket ? 'hidden lg:flex' : 'flex'} 
        lg:col-span-4 border-r border-brand-border flex-col h-full min-h-0 bg-brand-bg
      `}>
        <div className="p-4 border-b border-brand-border bg-brand-bg/80 backdrop-blur-md shrink-0 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-zinc-100 text-sm">Tickets</h3>
              <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full border border-brand-border font-mono">
                {filteredTickets.length}
              </span>
            </div>
            <ListFilter size={16} className="text-zinc-600" />
          </div>

          <div className="flex gap-2 p-1 bg-zinc-900/50 rounded-lg border border-brand-border">
            {filterOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setActiveFilter(opt.label)}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all
                  ${activeFilter === opt.label 
                    ? 'bg-zinc-800 text-blue-400 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <opt.icon size={12} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {filteredTickets.map(ticket => (
              <motion.div
                key={ticket.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <TicketCard 
                  ticket={ticket} 
                  active={selectedTicket?.id === ticket.id}
                  onClick={() => setSelectedTicket(ticket)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className={`
        ${!selectedTicket ? 'hidden lg:flex' : 'flex'} 
        lg:col-span-8 bg-brand-bg/20 flex-col h-full min-h-0 overflow-hidden
      `}>
        {selectedTicket && (
          <div className="lg:hidden p-4 border-b border-brand-border bg-brand-bg shrink-0">
            <button onClick={() => setSelectedTicket(null)} className="flex items-center gap-2 text-blue-400 text-sm font-medium">
              <ArrowLeft size={16} /> Back to Tickets
            </button>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {selectedTicket ? (
            /* PASSED PROP HERE */
            <TicketDetail ticket={selectedTicket} addNotification={addNotification} />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600">
              <p className="text-xs font-medium uppercase tracking-widest opacity-30">Select a ticket to view analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}