import { memo } from 'react';
import { motion } from 'framer-motion';
import { User, Tag } from 'lucide-react';
import { ANIMATION_VARIANTS } from '../../constants/animations';
import { getPriorityStyles } from '../../utils/helpers';

/**
 * PriorityBadge - Displays ticket priority level
 */
const PriorityBadge = memo(({ priority }) => (
  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getPriorityStyles(priority)}`}>
    {priority}
  </span>
));

PriorityBadge.displayName = 'PriorityBadge';

/**
 * TicketMetadata - Shows user and category information
 */
const TicketMetadata = memo(({ user, category, active }) => (
  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-brand-border/50">
    <div className="flex items-center gap-1.5 min-w-0">
      <div className={`p-1 rounded-md ${active ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
        <User size={10} />
      </div>
      <span className="text-[11px] text-zinc-400 truncate font-medium">{user}</span>
    </div>

    <div className="flex items-center gap-1.5 ml-auto">
      <Tag size={10} className="text-zinc-600" />
      <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">{category}</span>
    </div>
  </div>
));

TicketMetadata.displayName = 'TicketMetadata';

/**
 * TicketCard - Displays individual ticket with priority and metadata
 * @component
 * @param {Object} ticket - Ticket data object
 * @param {boolean} active - Whether ticket is currently active
 * @param {Function} onClick - Callback when ticket is clicked
 */
function TicketCard({ ticket, active, onClick }) {
  return (
    <motion.div
      layout
      {...ANIMATION_VARIANTS.slideInUp}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        p-4 rounded-xl cursor-pointer border transition-all duration-200 group
        ${active 
          ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
          : 'bg-brand-surface border-brand-border hover:border-zinc-700 hover:bg-zinc-800/40'}
      `}
    >
      {/* Ticket Header */}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-mono font-medium ${active ? 'text-blue-400' : 'text-zinc-500'}`}>
          {ticket.id}
        </span>
        <PriorityBadge priority={ticket.priority} />
      </div>

      {/* Ticket Title and Description */}
      <h4 className={`font-semibold text-sm leading-tight truncate transition-colors ${active ? 'text-white' : 'text-zinc-200'}`}>
        {ticket.title}
      </h4>
      <p className="text-xs text-zinc-500 mt-1.5 line-clamp-1 leading-relaxed">
        {ticket.description}
      </p>

      {/* Ticket Metadata */}
      <TicketMetadata user={ticket.user} category={ticket.category} active={active} />
    </motion.div>
  );
}

export default memo(TicketCard);