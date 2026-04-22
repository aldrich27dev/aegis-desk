import { useState, useMemo } from 'react';
import { Terminal, Search, Download, ShieldCheck, Cpu, User, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuditPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for the audit ledger
  const logs = useMemo(() => [
    { id: 1, type: 'INFO', user: 'system_core', action: 'NODE_REBALANCE', target: 'cluster_alpha', status: 'SUCCESS', timestamp: '2026-04-17T14:30:01Z' },
    { id: 2, type: 'WARN', user: 'admin_jt', action: 'FIREWALL_BYPASS_ATTEMPT', target: 'entry_gateway_04', status: 'BLOCKED', timestamp: '2026-04-17T14:32:45Z' },
    { id: 3, type: 'INFO', user: 'architect_01', action: 'POLICY_UPDATE', target: 'auth_service', status: 'SUCCESS', timestamp: '2026-04-17T14:35:12Z' },
    { id: 4, type: 'ERROR', user: 'unknown_ip', action: 'SSH_BRUTE_FORCE', target: 'db_master', status: 'FAILED', timestamp: '2026-04-17T14:40:00Z' },
    { id: 5, type: 'INFO', user: 'system_core', action: 'BACKUP_COMPLETED', target: 's3_vault_01', status: 'SUCCESS', timestamp: '2026-04-17T14:45:30Z' },
    { id: 6, type: 'INFO', user: 'moderator_02', action: 'TICKET_ESCALATION', target: 'TK-8802', status: 'SUCCESS', timestamp: '2026-04-17T14:50:11Z' },
    // Adding more for scroll testing...
    ...Array.from({ length: 15 }).map((_, i) => ({
      id: 10 + i,
      type: i % 5 === 0 ? 'WARN' : 'INFO',
      user: `operator_${i + 5}`,
      action: 'QUERY_EXECUTION',
      target: `node_tx_${100 + i}`,
      status: 'SUCCESS',
      timestamp: new Date(Date.now() - (i * 100000)).toISOString()
    }))
  ], []);

  const filteredLogs = logs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.target.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLogStyle = (type) => {
    switch (type) {
      case 'ERROR': return 'text-red-500 bg-red-500/10';
      case 'WARN': return 'text-amber-500 bg-amber-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white italic tracking-tight">Audit Ledger</h2>
          <p className="text-zinc-500 text-sm">Real-time immutable stream of Aegis Protocol events.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-brand-border rounded-xl text-[10px] font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all uppercase tracking-widest">
          <Download size={14} /> Export Secure CSV
        </button>
      </header>

      {/* Terminal Interface */}
      <div className="flex-1 bg-zinc-950 border border-brand-border rounded-2xl overflow-hidden flex flex-col font-mono shadow-2xl relative">
        {/* Terminal Header */}
        <div className="p-3 bg-zinc-900 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-zinc-500">
              <Terminal size={14} />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Live_Stream_V4.2</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] text-green-500 font-bold uppercase tracking-tighter">Connection Stable</span>
            </div>
          </div>

          <div className="relative w-64">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kernel events..." 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 py-1.5 text-[10px] text-zinc-300 focus:border-blue-500/50 outline-none transition-all"
            />
          </div>
        </div>

        {/* Log Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {filteredLogs.map((log) => (
            <motion.div 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              key={log.id} 
              className="flex items-start gap-3 py-1.5 px-3 rounded-md hover:bg-zinc-900/40 transition-colors group border border-transparent hover:border-zinc-800/50"
            >
              <span className="text-zinc-700 shrink-0 select-none">[{log.timestamp.split('T')[1].replace('Z', '')}]</span>
              
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${getLogStyle(log.type)}`}>
                {log.type}
              </span>

              <div className="flex-1 text-zinc-400 group-hover:text-zinc-200 transition-colors flex flex-wrap gap-x-2">
                <span>Kernel_Action:</span>
                <span className="text-blue-400">"{log.action}"</span>
                <span className="text-zinc-600">|</span>
                <span className="flex items-center gap-1">
                  <User size={10} className="text-zinc-600" />
                  <span className="text-purple-400 underline decoration-purple-400/20 underline-offset-2">{log.user}</span>
                </span>
                <span className="text-zinc-600">|</span>
                <span className="flex items-center gap-1">
                  <Cpu size={10} className="text-zinc-600" />
                  <span className="text-amber-400">{log.target}</span>
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <ShieldCheck size={12} className={log.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'} />
                <span className={`text-[9px] font-bold ${log.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'}`}>
                  {log.status}
                </span>
              </div>
            </motion.div>
          ))}
          
          {filteredLogs.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 py-20">
              <AlertTriangle size={32} className="mb-2" />
              <p className="text-xs">No entries match your search parameters</p>
            </div>
          )}
        </div>

        {/* Console Status Bar */}
        <div className="p-2 px-4 bg-zinc-900 border-t border-brand-border flex justify-between items-center text-[9px] text-zinc-500 uppercase font-bold tracking-widest">
          <div className="flex gap-4">
            <span>Lines: {filteredLogs.length}</span>
            <span>Buffer: 100%</span>
          </div>
          <span>Security_Level: P-0 (UNRESTRICTED)</span>
        </div>
      </div>
    </div>
  );
}