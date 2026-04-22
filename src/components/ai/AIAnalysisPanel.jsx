import { memo, useState, useEffect, useCallback } from 'react';
import { Bot, Zap, CheckCircle2, RefreshCcw, Sparkles, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyzeTicket, generateResponse } from '../../utils/aiEngine';
import { ANIMATION_DELAYS } from '../../constants/animations';

/**
 * LoadingState - Displays loading animation during analysis
 */
const LoadingState = memo(() => (
  <div className="flex flex-col items-center py-12 space-y-4">
    <RefreshCcw className="animate-spin text-blue-500" />
    <p className="text-sm text-zinc-500 italic">Grok is analyzing ticket sentiment and category...</p>
  </div>
));

LoadingState.displayName = 'LoadingState';

/**
 * InsightCard - Card displaying a single insight
 */
const InsightCard = memo(({ label, value, icon: Icon, color }) => (
  <div className="bg-brand-bg/50 p-3 rounded-lg border border-brand-border">
    <p className="text-[10px] text-zinc-500 uppercase mb-1">{label}</p>
    <div className={`flex items-center gap-2 font-bold ${color}`}>
      <Icon size={14} />
      {value}
    </div>
  </div>
));

InsightCard.displayName = 'InsightCard';

/**
 * DiagnosticSection - AI auto-diagnostic results
 */
const DiagnosticSection = memo(({ insights }) => (
  <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden">
    <div className="flex items-center gap-2 text-blue-400 mb-4">
      <Bot size={20} />
      <span className="font-bold tracking-tight">AI AUTO-DIAGNOSTIC</span>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <InsightCard
        label="Suggested Category"
        value={insights.category}
        icon={Zap}
        color="text-yellow-400"
      />
      <InsightCard
        label="Priority Level"
        value={insights.priority}
        icon={ShieldAlert}
        color="text-red-400"
      />
      <InsightCard
        label="Routing"
        value={insights.department}
        icon={CheckCircle2}
        color="text-green-400"
      />
    </div>
  </div>
));

DiagnosticSection.displayName = 'DiagnosticSection';

/**
 * ResponseSection - AI generated response display
 */
const ResponseSection = memo(({ response }) => (
  <div className="bg-brand-surface border border-brand-border rounded-2xl p-6">
    <h3 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
      <Sparkles size={16} />
      AI GENERATED RESPONSE
    </h3>
    <div className="bg-brand-bg rounded-lg p-4 text-zinc-300 font-mono text-xs border border-brand-border leading-relaxed">
      {response}
    </div>
    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-all text-xs">
      Send Response & Close Ticket
    </button>
  </div>
));

ResponseSection.displayName = 'ResponseSection';

/**
 * AIAnalysisPanel - Displays AI analysis and suggestions for ticket
 * @component
 * @param {Object} ticket - Ticket data to analyze
 */
function AIAnalysisPanel({ ticket }) {
  const [analyzing, setAnalyzing] = useState(true);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    setAnalyzing(true);

    // Simulate API delay for "Grok"
    const timer = setTimeout(() => {
      const result = analyzeTicket(ticket.description);
      const aiReply = generateResponse({ ...ticket, ...result });
      setInsights({ ...result, aiReply });
      setAnalyzing(false);
    }, ANIMATION_DELAYS.fast);

    return () => clearTimeout(timer);
  }, [ticket]);

  if (analyzing) {
    return <LoadingState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <DiagnosticSection insights={insights} />
      <ResponseSection response={insights.aiReply} />
    </motion.div>
  );
}

export default memo(AIAnalysisPanel);