import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Sparkles,
  User,
  Zap,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { getPriorityStyles } from '../../utils/helpers';
import { ANIMATION_DELAYS } from '../../constants/animations';

/**
 * TicketHeader - Displays ticket information
 */
const TicketHeader = memo(({ ticket }) => (
  <div className="flex justify-between items-start border-b border-brand-border pb-6 shrink-0">
    <div>
      <span className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest">
        {ticket.id}
      </span>
      <h2 className="text-2xl font-bold text-white mt-1">{ticket.title}</h2>
      <div className="flex items-center gap-3 mt-3">
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
            ticket.priority === 'High'
              ? 'bg-red-500/10 text-red-500 border border-red-500/20'
              : 'bg-zinc-800 text-zinc-400 border border-brand-border'
          }`}
        >
          {ticket.priority} Priority
        </span>
        <span className="text-zinc-500 text-xs">Category: {ticket.category || 'System'}</span>
      </div>
    </div>
  </div>
));

TicketHeader.displayName = 'TicketHeader';

/**
 * MessageBubble - Individual message in thread
 */
const MessageBubble = memo(({ message, isUserMessage }) => (
  <div className="flex gap-4">
    {!isUserMessage && (
      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-brand-border">
        <User size={16} className="text-zinc-400" />
      </div>
    )}
    <div className="bg-brand-surface border border-brand-border p-4 rounded-2xl rounded-tl-none flex-1">
      <p className="text-sm text-zinc-300 leading-relaxed">{message}</p>
    </div>
  </div>
));

MessageBubble.displayName = 'MessageBubble';

/**
 * MessageThread - Scrollable message history
 */
const MessageThread = memo(({ ticketDescription }) => (
  <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
    <MessageBubble
      message={ticketDescription || 'The user reported a potential breach in the firewall layer. Analysis required.'}
      isUserMessage={false}
    />
  </div>
));

MessageThread.displayName = 'MessageThread';

/**
 * ReplyHeaderTabs - Tab selection for reply type
 */
const ReplyHeaderTabs = memo(() => (
  <div className="flex gap-4">
    <button className="text-[10px] font-bold uppercase text-blue-400 border-b-2 border-blue-400 pb-0.5">
      Response
    </button>
    <button className="text-[10px] font-bold uppercase text-zinc-500 hover:text-zinc-300 transition-colors">
      Internal Note
    </button>
  </div>
));

ReplyHeaderTabs.displayName = 'ReplyHeaderTabs';

/**
 * AIDraftButton - Button to generate AI draft response
 */
const AIDraftButton = memo(({ isGenerating, onClick }) => (
  <button
    onClick={onClick}
    disabled={isGenerating}
    className="flex items-center gap-2 text-[10px] font-bold uppercase text-blue-400 hover:text-blue-300 disabled:opacity-50 transition-all"
  >
    <Sparkles size={12} className={isGenerating ? 'animate-spin' : ''} />
    {isGenerating ? 'AI Processing...' : 'AI Smart Draft'}
  </button>
));

AIDraftButton.displayName = 'AIDraftButton';

/**
 * ReplyTextarea - Input for composing response
 */
const ReplyTextarea = memo(({ value, onChange }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder="Write your response..."
    className="w-full bg-transparent p-4 text-sm text-zinc-200 outline-none min-h-[100px] resize-none"
  />
));

ReplyTextarea.displayName = 'ReplyTextarea';

/**
 * ReplyFooter - Action buttons for reply submission
 */
const ReplyFooter = memo(({ reply, onSend }) => (
  <div className="p-3 border-t border-brand-border flex justify-between items-center bg-zinc-900/20">
    <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono">
      <Zap size={10} />
      <span>Auto-resolve on send</span>
    </div>
    <button
      onClick={onSend}
      disabled={!reply.trim()}
      className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
    >
      <Send size={14} />
      Send
    </button>
  </div>
));

ReplyFooter.displayName = 'ReplyFooter';

/**
 * ConfirmationModal - Confirmation dialog for sending reply
 */
const ConfirmationModal = memo(({ reply, ticketId, isSent, onConfirm, onCancel }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => !isSent && onCancel()}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-brand-border rounded-2xl shadow-2xl z-[101] overflow-hidden"
    >
      <div className="p-8">
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-blue-400">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <AlertCircle size={20} />
                </div>
                <h3 className="font-bold text-lg tracking-tight">Confirm Transmission</h3>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed">
                You are about to send this response and mark the ticket as{' '}
                <span className="text-zinc-200 font-bold">Resolved</span>.
              </p>

              <div className="bg-zinc-950 rounded-xl p-4 border border-brand-border/50 max-h-32 overflow-y-auto">
                <p className="text-[11px] font-mono text-zinc-500 italic">"{reply}"</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-brand-border text-zinc-400 text-xs font-bold hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck size={14} />
                  Confirm Send
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-6 space-y-4 text-center"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-green-500 rounded-full"
                />
                <div className="bg-green-500/10 p-4 rounded-full relative">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Transmission Successful</h3>
                <p className="text-zinc-500 text-xs mt-1">Ticket {ticketId} has been updated.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  </>
));

ConfirmationModal.displayName = 'ConfirmationModal';

/**
 * ReplyBox - Main reply composition area
 */
const ReplyBox = memo(
  ({ reply, isGenerating, onReplyChange, onGenerateDraft, onSendClick }) => (
    <div className="pt-6 border-t border-brand-border shrink-0">
      <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden focus-within:border-blue-500/50 transition-colors shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2 border-b border-brand-border bg-zinc-900/50">
          <ReplyHeaderTabs />
          <AIDraftButton isGenerating={isGenerating} onClick={onGenerateDraft} />
        </div>

        <ReplyTextarea value={reply} onChange={onReplyChange} />
        <ReplyFooter reply={reply} onSend={onSendClick} />
      </div>
    </div>
  )
);

ReplyBox.displayName = 'ReplyBox';

/**
 * TicketDetail - Main ticket detail view with reply composition
 * @component
 * @param {Object} ticket - Ticket data
 * @param {Function} addNotification - Callback to add notifications
 */
function TicketDetail({ ticket, addNotification }) {
  const [reply, setReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!ticket) return null;

  const generateAIDraft = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      setReply(
        `Hello! I've analyzed your request regarding "${ticket.title}". Based on our security protocols, I recommend verifying your Aegis keys and checking the logs for ID: ${ticket.id}. Should I initiate a diagnostic for you?`
      );
      setIsGenerating(false);
      addNotification('AI Draft Ready', 'A response has been generated based on ticket context.', 'info');
    }, ANIMATION_DELAYS.normal);
  }, [ticket, addNotification]);

  const handleSend = useCallback(() => {
    setIsSent(true);

    setTimeout(() => {
      addNotification('Response Sent', `Message sent regarding ${ticket.id}`, 'success');
      setShowConfirm(false);
      setReply('');

      setTimeout(() => {
        setIsSent(false);
      }, 500);
    }, ANIMATION_DELAYS.slow);
  }, [ticket.id, addNotification]);

  const handleSendClick = useCallback(() => {
    reply.trim() && setShowConfirm(true);
  }, [reply]);

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto h-full flex flex-col min-h-0 relative">
      <TicketHeader ticket={ticket} />
      <MessageThread ticketDescription={ticket.description} />
      <ReplyBox
        reply={reply}
        isGenerating={isGenerating}
        onReplyChange={(e) => setReply(e.target.value)}
        onGenerateDraft={generateAIDraft}
        onSendClick={handleSendClick}
      />

      <AnimatePresence>
        {showConfirm && (
          <ConfirmationModal
            reply={reply}
            ticketId={ticket.id}
            isSent={isSent}
            onConfirm={handleSend}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(TicketDetail);