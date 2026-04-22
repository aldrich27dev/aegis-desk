import { motion } from 'framer-motion';
import { Brain, Sparkles, ShieldAlert, BarChart3, Fingerprint } from 'lucide-react';

export default function AIInsightsPage({ addNotification }) {
  const analysisCards = [
    { title: "Sentiment Score", value: "88/100", detail: "Positive user feedback trend", color: "text-green-400" },
    { title: "Anomaly Detection", value: "0.02%", detail: "Below critical threshold", color: "text-blue-400" },
    { title: "Resolution Rate", value: "94%", detail: "+2% from last epoch", color: "text-purple-400" },
  ];

  // Static array for the waveform to prevent "white screen" hydration errors
  const waveformBars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    initialHeight: Math.floor(Math.random() * 40) + 10,
    peakHeight: Math.floor(Math.random() * 50) + 40
  }));

  const handleScan = () => {
    if (addNotification) {
      addNotification("Deep Scan", "Analyzing system nodes and traffic patterns...", "info");
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full py-6 px-4 space-y-8 h-full flex flex-col overflow-y-auto custom-scrollbar">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-blue-500 mb-1">
            <Brain size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Neural Analytics</span>
          </div>
          <h2 className="text-3xl font-bold text-white italic tracking-tighter">AI Insights</h2>
        </div>
        <button 
          onClick={handleScan}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Sparkles size={14} />
          Run Forensic Scan
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        {analysisCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-surface border border-brand-border p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Fingerprint size={48} />
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{card.title}</p>
            <h3 className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</h3>
            <p className="text-xs text-zinc-500 mt-2">{card.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Analysis Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-[400px]">
        
        {/* Predictive Engine (The "Visual" Part) */}
        <div className="lg:col-span-3 bg-brand-surface border border-brand-border rounded-3xl p-6 flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={16} className="text-blue-500" />
              Traffic Prediction Model
            </h4>
            <div className="text-[10px] font-mono text-zinc-500">Node: cluster-04-alpha</div>
          </div>
          
          <div className="flex-1 min-h-[250px] bg-zinc-950/50 rounded-2xl border border-brand-border/50 flex items-center justify-center relative overflow-hidden group">
            {/* Waveform Grid */}
            <div className="absolute inset-0 flex items-center justify-center gap-1 px-8">
              {waveformBars.map((bar) => (
                <motion.div
                  key={bar.id}
                  animate={{ 
                    height: [`${bar.initialHeight}%`, `${bar.peakHeight}%`, `${bar.initialHeight}%`] 
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2, 
                    delay: bar.id * 0.05,
                    ease: "easeInOut"
                  }}
                  className="w-full max-w-[4px] bg-gradient-to-t from-blue-600/20 to-blue-400 rounded-full group-hover:from-blue-600/40 transition-all"
                />
              ))}
            </div>
            <div className="z-10 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none">
              Live Pattern Recognition
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-3xl flex flex-col overflow-hidden max-h-[500px] lg:max-h-full">
          <div className="p-4 border-b border-brand-border bg-zinc-900/50">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-500" />
              Observed Anomalies
            </h4>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-brand-bg/20">
            {[
              { id: 'AN-882', desc: 'Non-standard routing detected in Ticket #402', threat: 'Low' },
              { id: 'AN-891', desc: 'Unexpected login pattern from VPN node', threat: 'Medium' },
              { id: 'AN-902', desc: 'Brute-force sequence neutralized', threat: 'High' },
              { id: 'AN-911', desc: 'Encrypted payload identified in message thread', threat: 'Medium' },
              { id: 'AN-942', desc: 'Node saturation in US-EAST-1 cluster', threat: 'Low' },
            ].map((anomaly) => (
              <div key={anomaly.id} className="p-3 bg-zinc-950/50 rounded-xl border border-brand-border/50 hover:border-zinc-700 transition-colors group">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-mono text-blue-400 group-hover:text-blue-300 transition-colors">{anomaly.id}</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    anomaly.threat === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    anomaly.threat === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                    'bg-green-500/10 text-green-500 border border-green-500/20'
                  }`}>
                    {anomaly.threat}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">{anomaly.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}