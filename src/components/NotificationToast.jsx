import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, CheckCircle2 } from 'lucide-react';

/**
 * Toast - Individual notification toast item
 */
const Toast = memo(({ notification, onRemove }) => {
  const isError = notification.type === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      layout
      className={`p-4 rounded-xl border shadow-2xl flex gap-3 items-start relative overflow-hidden ${
        isError
          ? 'bg-red-950/40 border-red-500/50 text-red-200'
          : 'bg-zinc-900 border-brand-border text-zinc-200'
      }`}
    >
      {isError ? (
        <AlertCircle size={18} className="text-red-500 shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
      )}

      <div className="flex-1">
        <p className="text-xs font-bold leading-tight">{notification.title}</p>
        <p className="text-[10px] opacity-70 mt-1 leading-relaxed">{notification.message}</p>
      </div>

      <button
        onClick={() => onRemove(notification.id)}
        className="p-1 hover:bg-white/10 rounded-md transition-colors"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>

      {/* Progress bar timer */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: 5, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20"
      />
    </motion.div>
  );
});

Toast.displayName = 'Toast';

/**
 * NotificationToast - Toast notification container
 * @component
 * @param {Array} notifications - Array of notification objects
 * @param {Function} removeNotification - Callback to remove notification
 */
function NotificationToast({ notifications, removeNotification }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 w-80">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default memo(NotificationToast);