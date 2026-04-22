import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Bell, Eye, Cpu, Check, RotateCcw } from 'lucide-react';

export default function SettingsPage({ addNotification }) {
  const [settings, setSettings] = useState({
    stealthMode: true,
    autoRotate: false,
  });

  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'security', title: 'Security', icon: Shield, desc: 'Protocol rotation and firewall rules.' },
    { id: 'privacy', title: 'Privacy', icon: Lock, desc: 'Encryption keys and session management.' },
    { id: 'interface', title: 'Interface', icon: Eye, desc: 'Theme, layout, and visual accessibility.' },
    { id: 'notifications', title: 'Notifications', icon: Bell, desc: 'Alert thresholds and sound effects.' },
  ];

  const handleSectionClick = (section) => {
    setActiveSection(section.id);
    setTimeout(() => {
      setActiveSection(null);
      if (typeof addNotification === 'function') {
        addNotification(`${section.title} Config`, `Module initialized successfully.`, "info");
      }
    }, 600);
  };

  const toggleSetting = (key) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    if (typeof addNotification === 'function') {
      addNotification(
        "Preference Updated",
        `${key.replace(/([A-Z])/g, ' $1')} status: ${newValue ? 'Active' : 'Inactive'}`,
        newValue ? "success" : "info"
      );
    }
  };

  return (
    // The "max-w-4xl mx-auto" handles the horizontal centering
    <div className="max-w-3xl mx-auto w-full py-8 px-4 space-y-10 min-h-full flex flex-col justify-start">
      
      {/* Centered Header */}
      <header className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white italic tracking-tighter">System Preferences</h2>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Configure your Aegis terminal environment and security protocols.
        </p>
      </header>

      {/* Navigation Grid - Centered items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section) => (
          <button 
            key={section.id}
            onClick={() => handleSectionClick(section)}
            className="flex items-center gap-4 p-5 bg-brand-surface border border-brand-border rounded-2xl hover:bg-zinc-800/50 hover:border-blue-500/30 transition-all text-left group"
          >
            <div className={`p-3 bg-zinc-900 border border-brand-border rounded-xl transition-colors ${activeSection === section.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'group-hover:border-blue-500/50'}`}>
              <section.icon 
                size={20} 
                className={`transition-colors ${activeSection === section.id ? 'text-blue-400 animate-pulse' : 'text-zinc-400 group-hover:text-blue-400'}`} 
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{section.title}</h4>
              <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">{section.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Main Control Panel - Centered Card */}
      <div className="bg-brand-surface border border-brand-border rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-brand-border bg-zinc-900/50 flex justify-between items-center">
           <div className="flex items-center gap-2">
             <Cpu size={18} className="text-blue-500" />
             <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Aegis Core V4.2.0</h3>
           </div>
           <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
             STABLE
           </span>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Toggle: Stealth Protocol */}
          <div className="flex justify-between items-center group">
            <div className="space-y-1">
              <p className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">Stealth Protocol</p>
              <p className="text-xs text-zinc-500">Mask terminal IP from public search nodes.</p>
            </div>
            <button 
              onClick={() => toggleSetting('stealthMode')}
              className={`w-12 h-6 rounded-full transition-all flex items-center px-1 shadow-inner ${
                settings.stealthMode ? 'bg-blue-600' : 'bg-zinc-800'
              }`}
            >
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                animate={{ x: settings.stealthMode ? 24 : 0 }}
                className="w-4 h-4 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

          {/* Toggle: Auto-Rotate Keys */}
          <div className="flex justify-between items-center group">
            <div className="space-y-1">
              <p className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors">Auto-Rotate Keys</p>
              <p className="text-xs text-zinc-500">Every 12 hours Aegis rotates all active tokens.</p>
            </div>
            <button 
              onClick={() => toggleSetting('autoRotate')}
              className={`w-12 h-6 rounded-full transition-all flex items-center px-1 shadow-inner ${
                settings.autoRotate ? 'bg-blue-600' : 'bg-zinc-800'
              }`}
            >
              <motion.div 
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                animate={{ x: settings.autoRotate ? 24 : 0 }}
                className="w-4 h-4 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
        </div>

        {/* Centered Footer Actions */}
        <div className="px-8 py-5 bg-zinc-900/40 border-t border-brand-border flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <Check size={12} className="text-green-500" />
            SYNCHRONIZED WITH GLOBAL NODE
          </div>
          <button 
            className="flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-400 hover:text-white transition-all bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-brand-border"
          >
            <RotateCcw size={12} />
            Reset Defaults
          </button>
        </div>
      </div>
    </div>
  );
}