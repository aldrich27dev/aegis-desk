import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Ticket, Command } from 'lucide-react';
import { useKeyDown } from '../hooks';
import { BACKDROP_ANIMATION, ANIMATION_VARIANTS } from '../constants/animations';
import { mockTickets } from '../data/mockTickets';

/**
 * SearchBackdrop - Modal background with blur effect
 */
const SearchBackdrop = memo(({ onClick }) => (
  <motion.div
    {...BACKDROP_ANIMATION}
    onClick={onClick}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
  />
));

SearchBackdrop.displayName = 'SearchBackdrop';

/**
 * ResultItem - Individual search result
 */
const ResultItem = memo(({ result, icon: Icon, onSelect }) => (
  <button
    onClick={() => onSelect(result)}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-600/10 hover:text-blue-400 text-zinc-400 transition-all text-left group"
  >
    <Icon size={18} className="group-hover:text-blue-400" />
    <div className="flex-1 overflow-hidden">
      <p className="text-sm font-medium truncate text-zinc-200 group-hover:text-blue-400">
        {result.title || result}
      </p>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
        {result.type} {result.id && `• ${result.id}`}
      </p>
    </div>
  </button>
));

ResultItem.displayName = 'ResultItem';

/**
 * EmptyState - Displayed when no search results found
 */
const EmptyState = memo(({ query }) => (
  <div className="py-12 text-center text-zinc-500">
    <p className="text-xs">
      No results for <span className="text-zinc-300">"{query}"</span>
    </p>
  </div>
));

EmptyState.displayName = 'EmptyState';

/**
 * SearchResults - List of search results
 */
const SearchResults = memo(({ results, onSelect }) => (
  <div className="max-h-[350px] overflow-y-auto p-2">
    {results.length > 0 ? (
      <div className="space-y-1">
        {results.map((result, i) => (
          <ResultItem
            key={i}
            result={result}
            icon={result.icon || Ticket}
            onSelect={() => onSelect(result)}
          />
        ))}
      </div>
    ) : (
      <EmptyState query="" />
    )}
  </div>
));

SearchResults.displayName = 'SearchResults';

/**
 * SearchFooter - Help text and shortcuts
 */
const SearchFooter = memo(() => (
  <div className="px-4 py-2 border-t border-brand-border bg-brand-bg/50 flex justify-between items-center">
    <span className="text-[10px] text-zinc-600 font-mono">AegisDesk Command Center v1.0</span>
    <div className="flex gap-2 items-center text-[10px] text-zinc-500">
      <span>↑↓ to navigate</span>
      <span>↵ to select</span>
    </div>
  </div>
));

SearchFooter.displayName = 'SearchFooter';

/**
 * Filter and search through available results
 */
function getSearchResults(query) {
  if (query === '') return [];

  const pages = ['Overview', 'Tickets', 'AI Insights', 'Security', 'Settings'];

  const ticketResults = mockTickets
    .filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.id.toLowerCase().includes(query.toLowerCase())
    )
    .map((t) => ({ ...t, type: 'ticket', icon: Ticket }));

  const pageResults = pages
    .filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    .map((p) => ({ title: p, type: 'page', icon: Command }));

  return [...ticketResults, ...pageResults].slice(0, 6);
}

/**
 * CommandCenter - Command palette / search modal
 * @component
 * @param {boolean} isOpen - Whether the command center is open
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onNavigate - Callback to navigate to a page or ticket
 */
function CommandCenter({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const results = getSearchResults(query);

  // Close on Escape key
  useKeyDown('Escape', onClose);

  const handleSelect = useCallback(
    (result) => {
      onNavigate(result.type === 'page' ? result.title : 'Tickets');
      onClose();
    },
    [onNavigate, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <SearchBackdrop onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101] p-4"
          >
            <div className="bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-4 py-3 border-b border-brand-border gap-3">
                <Search size={20} className="text-zinc-500" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tickets, pages, or settings..."
                  className="bg-transparent border-none outline-none text-zinc-200 w-full text-sm"
                />
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-500 text-[10px]">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <SearchResults results={results} onSelect={handleSelect} />

              {/* Footer */}
              <SearchFooter />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default memo(CommandCenter);