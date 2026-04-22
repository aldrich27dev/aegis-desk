import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Users, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function OverviewPage() {
  const stats = [
    { label: 'System Integrity', value: '99.9%', icon: Shield, color: 'text-blue-500', trend: '+0.02%' },
    { label: 'Active Threats', value: '12', icon: AlertTriangle, color: 'text-amber-500', trend: '-4' },
    { label: 'Response Time', value: '142ms', icon: Zap, color: 'text-purple-500', trend: '-12ms' },
    { label: 'Active Nodes', value: '1,204', icon: Activity, color: 'text-green-500', trend: '+18' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <header>
        <h2 className="text-2xl font-bold text-white italic tracking-tight">Aegis Command</h2>
        <p className="text-zinc-500 text-sm">Unified oversight of all Aegis security protocols.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-surface border border-brand-border p-5 rounded-2xl group hover:border-zinc-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 rounded-lg bg-zinc-900 border border-brand-border ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-mono text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded border border-brand-border">
                {stat.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Graph Placeholder */}
        <div className="lg:col-span-2 bg-brand-surface border border-brand-border rounded-2xl p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Network Traffic Pulse</h4>
            <div className="flex gap-2">
               <span className="flex items-center gap-1.5 text-[10px] text-blue-400 font-bold uppercase"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Inbound</span>
               <span className="flex items-center gap-1.5 text-[10px] text-purple-400 font-bold uppercase"><span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Outbound</span>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-1 px-2">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 60 + 20}%` }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5, delay: i * 0.05 }}
                className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-400/60 rounded-t-sm"
              />
            ))}
          </div>
        </div>

        {/* Recent Audit Mini-Log */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl flex flex-col h-[400px]">
          <div className="p-4 border-b border-brand-border">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Clock size={14} className="text-zinc-500" /> Recent Actions
            </h4>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {[
              { msg: 'Shield rotated API keys', time: '12s ago', type: 'system' },
              { msg: 'Ticket #102 resolved', time: '2m ago', type: 'user' },
              { msg: 'Firewall block Singapore', time: '5m ago', type: 'security' },
              { msg: 'New admin authenticated', time: '14m ago', type: 'user' },
              { msg: 'Backup sync complete', time: '1h ago', type: 'system' },
            ].map((log, i) => (
              <div key={i} className="flex gap-3 items-start text-[11px]">
                <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${
                  log.type === 'security' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                  log.type === 'system' ? 'bg-blue-500' : 'bg-zinc-500'
                }`} />
                <div className="flex-1">
                  <p className="text-zinc-300 font-medium leading-none">{log.msg}</p>
                  <p className="text-zinc-600 font-mono mt-1 uppercase tracking-tighter">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}