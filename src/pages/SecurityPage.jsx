import { useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Activity, Lock, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SecurityPage({ addNotification }) {
  const events = [
    { id: 'SEC-99', type: 'Brute Force', status: 'Blocked', location: 'Singapore', time: '2m ago', severity: 'high' },
    { id: 'SEC-98', type: 'API Spike', status: 'Analyzed', location: 'Frankfurt', time: '14m ago', severity: 'medium' },
    { id: 'SEC-97', type: 'Auth Bypass', status: 'Blocked', location: 'Unknown', time: '1h ago', severity: 'high' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (addNotification) {
        addNotification(
          "Shield Protocol Active", 
          "Aegis has successfully rotated all session tokens.", 
          "info"
        );
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight italic">Security Center</h2>
          <p className="text-zinc-500 text-sm">Real-time threat mitigation and protocol oversight.</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Global Shield Status</p>
          <div className="flex items-center gap-2 justify-end mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs font-bold text-green-500 uppercase">Maximum Integrity</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-brand-surface border border-brand-border rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[320px] shadow-2xl">
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="w-40 h-40 border border-blue-500/10 border-t-blue-500/60 rounded-full"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <ShieldCheck size={48} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
             </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em] font-bold">Scanning Vectors</p>
            <div className="flex gap-1 justify-center mt-2">
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 bg-blue-500 rounded-full" 
                />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="p-4 border-b border-brand-border bg-zinc-900/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-zinc-500" />
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-tight">Active Interceptions</h3>
            </div>
            <button 
              onClick={() => addNotification("Manual Scan", "Starting deep packet inspection...", "info")}
              className="text-[10px] font-bold text-zinc-400 hover:text-white transition-colors bg-zinc-800 px-3 py-1 rounded border border-zinc-700"
            >
              Run Deep Scan
            </button>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-brand-border custom-scrollbar">
            {events.map((event) => (
              <motion.div 
                key={event.id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 flex items-center justify-between hover:bg-zinc-800/40 transition-all cursor-default group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${event.severity === 'high' ? 'bg-red-500/10' : 'bg-yellow-500/10'}`}>
                    <ShieldAlert size={18} className={event.severity === 'high' ? 'text-red-500' : 'text-yellow-500'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-zinc-100">{event.type} Attempt</p>
                      <span className="text-[9px] font-mono text-zinc-600">[{event.id}]</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5 flex items-center gap-1 uppercase tracking-tighter">
                      <Globe size={10} /> {event.location} • Observed {event.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${
                    event.status === 'Blocked' 
                    ? 'text-green-400 bg-green-400/5 border-green-400/20' 
                    : 'text-blue-400 bg-blue-400/5 border-blue-400/20'
                  }`}>
                    {event.status}
                  </span>
                  <p className="text-[10px] text-zinc-600 mt-1.5 font-mono">NODE_TX_{event.id}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}