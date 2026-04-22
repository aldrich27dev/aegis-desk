import { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Ticket,
  Bot,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from 'lucide-react';

/**
 * Navigation items configuration
 */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: Ticket, label: 'Tickets' },
  { icon: Bot, label: 'AI Insights' },
  { icon: ShieldCheck, label: 'Security' },
  { icon: Terminal, label: 'Audit' },
  { icon: Settings, label: 'Settings' },
];

/**
 * BrandHeader - Sidebar brand/logo section
 */
const BrandHeader = memo(({ isCollapsed }) => (
  <div className="flex items-center gap-3 px-2 mb-10 overflow-hidden whitespace-nowrap">
    <div className="min-w-[32px] w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
      <ShieldCheck size={20} className="text-white" />
    </div>
    {!isCollapsed && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl tracking-tight text-white"
      >
        Aegis<span className="text-blue-500">Desk</span>
      </motion.span>
    )}
  </div>
));

BrandHeader.displayName = 'BrandHeader';

/**
 * NavItemTooltip - Tooltip shown on hover when sidebar is collapsed
 */
const NavItemTooltip = memo(({ label }) => (
  <div className="absolute left-14 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-brand-border z-50 whitespace-nowrap">
    {label}
  </div>
));

NavItemTooltip.displayName = 'NavItemTooltip';

/**
 * NavItemActiveIndicator - Visual indicator for active navigation item
 */
const NavItemActiveIndicator = memo(() => (
  <motion.div
    layoutId="activePill"
    className="absolute left-0 w-1 h-5 bg-blue-500 rounded-r-full"
  />
));

NavItemActiveIndicator.displayName = 'NavItemActiveIndicator';

/**
 * NavItem - Individual navigation item
 */
const NavItem = memo(({ item, isActive, isCollapsed, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all relative group
      ${
        isActive
          ? 'bg-blue-600/10 text-blue-400 shadow-[inset_0_0_10px_rgba(37,99,235,0.05)]'
          : 'hover:bg-brand-surface text-zinc-400 hover:text-zinc-200'
      }
    `}
  >
    <item.icon
      size={20}
      className={`shrink-0 ${isActive ? 'text-blue-400' : 'text-zinc-400'}`}
    />

    {!isCollapsed && (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-sm whitespace-nowrap"
      >
        {item.label}
      </motion.span>
    )}

    {isActive && <NavItemActiveIndicator />}
    {isCollapsed && <NavItemTooltip label={item.label} />}
  </button>
));

NavItem.displayName = 'NavItem';

/**
 * CollapseToggle - Button to toggle sidebar collapse
 */
const CollapseToggle = memo(({ isCollapsed, onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-3 top-20 w-6 h-6 bg-brand-border border border-zinc-700 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all z-50 shadow-lg"
    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
  >
    {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
  </button>
));

CollapseToggle.displayName = 'CollapseToggle';

/**
 * UserInfo - Current user information section
 */
const UserInfo = memo(({ isCollapsed }) => (
  <>
    {!isCollapsed && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-auto p-2 bg-brand-surface/50 rounded-xl border border-brand-border/50"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 border border-white/10 shrink-0" />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">System Admin</p>
          </div>
        </div>
      </motion.div>
    )}
  </>
));

UserInfo.displayName = 'UserInfo';

/**
 * Sidebar - Main navigation sidebar
 * @component
 * @param {string} activeTab - Currently active tab/page
 * @param {Function} setActiveTab - Callback to set active tab
 */
function Sidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavClick = useCallback(
    (label) => {
      setActiveTab(label);
    },
    [setActiveTab]
  );

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="h-screen border-r border-brand-border flex flex-col p-4 bg-brand-bg relative hidden md:flex transition-colors shrink-0"
    >
      <BrandHeader isCollapsed={isCollapsed} />

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            isActive={activeTab === item.label}
            isCollapsed={isCollapsed}
            onClick={() => handleNavClick(item.label)}
          />
        ))}
      </nav>

      {/* User Information */}
      <UserInfo isCollapsed={isCollapsed} />

      {/* Collapse Toggle */}
      <CollapseToggle isCollapsed={isCollapsed} onClick={handleToggleCollapse} />
    </motion.aside>
  );
}

export default memo(Sidebar);