import { memo, useState, useCallback } from 'react';
import { Search, Bell, X, Info, ShieldAlert, CheckCircle2, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';
import { useClickOutside } from '../hooks';

/**
 * SearchButton - Quick search input button
 */
const SearchButton = memo(({ onSearchOpen }) => (
  <button
    onClick={onSearchOpen}
    className="flex items-center gap-3 bg-brand-surface border border-brand-border px-4 py-2 rounded-full w-full max-w-md group transition-all hover:border-zinc-600"
    aria-label="Open search"
  >
    <Search size={16} className="text-zinc-500 group-hover:text-zinc-300" />
    <span className="text-zinc-500 text-xs flex-1 text-left">Quick search...</span>
    <div className="hidden sm:flex items-center gap-1 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-500 font-mono">
      <Command size={10} />
      <span className="text-[10px]">K</span>
    </div>
  </button>
));

SearchButton.displayName = 'SearchButton';

/**
 * NotificationBadge - Unread notification indicator
 */
const NotificationBadge = memo(({ count }) => {
  if (count <= 0) return null;
  return (
    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-brand-bg animate-pulse" />
  );
});

NotificationBadge.displayName = 'NotificationBadge';

/**
 * NotificationBellButton - Bell icon button to toggle notifications
 */
const NotificationBellButton = memo(({ isOpen, unreadCount, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors relative ${
      isOpen ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white'
    }`}
    aria-label="Notifications"
  >
    <Bell size={20} />
    <NotificationBadge count={unreadCount} />
  </button>
));

NotificationBellButton.displayName = 'NotificationBellButton';

/**
 * NotificationEmpty - Empty state for notifications
 */
const NotificationEmpty = memo(() => (
  <div className="p-10 text-center space-y-2">
    <div className="flex justify-center">
      <CheckCircle2 size={32} className="text-zinc-800" />
    </div>
    <p className="text-xs text-zinc-600 italic">No recent activity found.</p>
  </div>
));

NotificationEmpty.displayName = 'NotificationEmpty';

/**
 * NotificationItem - Individual notification item
 */
const NotificationItem = memo(({ notification }) => (
  <div className="flex gap-3 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors cursor-pointer group relative">
    <div
      className={`p-2 rounded-lg shrink-0 ${
        notification.type === 'error' ? 'bg-red-500/10' : 'bg-blue-500/10'
      }`}
    >
      {notification.type === 'error' ? (
        <ShieldAlert size={14} className="text-red-500" />
      ) : (
        <Info size={14} className="text-blue-500" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-zinc-200 font-bold group-hover:text-blue-400 transition-colors">
        {notification.title}
      </p>
      <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
        {notification.message}
      </p>
      <p className="text-[9px] text-zinc-700 mt-2 font-mono uppercase">
        {notification.time || 'Recently'}
      </p>
    </div>
  </div>
));

NotificationItem.displayName = 'NotificationItem';

/**
 * NotificationList - List of notifications
 */
const NotificationList = memo(({ notifications }) => (
  <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-brand-bg/30">
    {notifications.length === 0 ? (
      <NotificationEmpty />
    ) : (
      <div className="p-2 space-y-1">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    )}
  </div>
));

NotificationList.displayName = 'NotificationList';

/**
 * NotificationHeader - Header section of notification panel
 */
const NotificationHeader = memo(({ unreadCount, onClose }) => (
  <div className="p-4 border-b border-brand-border flex justify-between items-center bg-zinc-900/50">
    <div className="flex items-center gap-2">
      <h4 className="text-xs font-bold text-white uppercase tracking-widest">Activity Feed</h4>
      {unreadCount > 0 && (
        <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/20">
          {unreadCount} New
        </span>
      )}
    </div>
    <button onClick={onClose} className="text-zinc-500 hover:text-white" aria-label="Close notifications">
      <X size={14} />
    </button>
  </div>
));

NotificationHeader.displayName = 'NotificationHeader';

/**
 * NotificationFooter - Footer section of notification panel
 */
const NotificationFooter = memo(({ onClearHistory, onClose }) => (
  <div className="p-3 border-t border-brand-border bg-zinc-900/30 text-center">
    <button
      onClick={() => {
        onClearHistory();
        onClose();
      }}
      className="text-[10px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-widest transition-colors"
    >
      Clear All Notifications
    </button>
  </div>
));

NotificationFooter.displayName = 'NotificationFooter';

/**
 * NotificationPanel - Full notification dropdown panel
 */
const NotificationPanel = memo(({ notifications, unreadCount, onClose, onClearHistory }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute top-12 right-0 w-80 bg-brand-surface border border-brand-border rounded-2xl shadow-2xl z-50 overflow-hidden"
    >
      <NotificationHeader unreadCount={unreadCount} onClose={onClose} />
      <NotificationList notifications={notifications} />
      <NotificationFooter onClearHistory={onClearHistory} onClose={onClose} />
    </motion.div>
    <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} />
  </>
));

NotificationPanel.displayName = 'NotificationPanel';

/**
 * Divider - Vertical separator
 */
const Divider = memo(() => <div className="h-6 w-px bg-brand-border mx-1" />);

Divider.displayName = 'Divider';

/**
 * HeaderActions - Right-side header actions (notifications and profile)
 */
const HeaderActions = memo(({ user, notifications, isNotificationsOpen, onNotificationToggle, onClearHistory, onLogout }) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const ref = useClickOutside(() => onNotificationToggle(false));

  return (
    <div className="flex items-center gap-4 relative" ref={ref}>
      <NotificationBellButton
        isOpen={isNotificationsOpen}
        unreadCount={unreadCount}
        onClick={() => onNotificationToggle(!isNotificationsOpen)}
      />

      <AnimatePresence>
        {isNotificationsOpen && (
          <NotificationPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onClose={() => onNotificationToggle(false)}
            onClearHistory={onClearHistory}
          />
        )}
      </AnimatePresence>

      <Divider />

      {user ? (
        <ProfileDropdown user={user} onLogout={onLogout} />
      ) : (
        <div className="w-8 h-8 bg-zinc-800 animate-pulse rounded-full border border-brand-border" />
      )}
    </div>
  );
});

HeaderActions.displayName = 'HeaderActions';

/**
 * Header - Main header component with search and notifications
 * @component
 * @param {Object} user - Current user object
 * @param {Function} onLogout - Callback for logout
 * @param {Function} onSearchOpen - Callback to open search
 * @param {Array} notifications - Array of notification objects
 * @param {Function} onClearHistory - Callback to clear notifications
 */
function Header({ user, onLogout, onSearchOpen, notifications = [], onClearHistory }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleNotificationToggle = useCallback((isOpen) => {
    setIsNotificationsOpen(isOpen);
  }, []);

  return (
    <header className="h-16 border-b border-brand-border bg-brand-bg/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <SearchButton onSearchOpen={onSearchOpen} />
      <HeaderActions
        user={user}
        notifications={notifications}
        isNotificationsOpen={isNotificationsOpen}
        onNotificationToggle={handleNotificationToggle}
        onClearHistory={onClearHistory}
        onLogout={onLogout}
      />
    </header>
  );
}

export default memo(Header);