import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, Bell, ChevronDown } from 'lucide-react';
import { useClickOutside } from '../hooks';

/**
 * ProfileButton - User avatar and profile button
 */
const ProfileButton = memo(({ user, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 p-1.5 pr-3 hover:bg-brand-surface border border-transparent hover:border-brand-border rounded-full transition-all group"
    aria-label="Profile menu"
  >
    <img
      src={user.avatar}
      alt="Avatar"
      className="w-8 h-8 rounded-full border border-blue-500/50"
    />
    <div className="text-left hidden sm:block">
      <p className="text-xs font-bold text-white leading-none">{user.name}</p>
      <p className="text-[10px] text-zinc-500 font-mono">{user.role}</p>
    </div>
    <ChevronDown
      size={14}
      className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
    />
  </button>
));

ProfileButton.displayName = 'ProfileButton';

/**
 * ProfileInfo - User information section
 */
const ProfileInfo = memo(({ user }) => (
  <div className="p-4 border-b border-brand-border bg-brand-surface/50">
    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
      Authenticated As
    </p>
    <p className="text-sm font-bold text-white">{user.name}</p>
    <p className="text-[11px] text-blue-400 font-mono">{user.id}</p>
  </div>
));

ProfileInfo.displayName = 'ProfileInfo';

/**
 * MenuItem - Dropdown menu item
 */
const MenuItem = memo(({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2 text-xs text-zinc-400 hover:text-white hover:bg-brand-surface rounded-lg transition-colors group"
  >
    <Icon size={14} className="group-hover:text-blue-400" />
    {label}
  </button>
));

MenuItem.displayName = 'MenuItem';

/**
 * MenuSection - Group of menu items
 */
const MenuSection = memo(({ children, divider = false }) => (
  <div className={`p-2 ${divider ? 'border-t border-brand-border bg-zinc-950/50' : ''}`}>
    {children}
  </div>
));

MenuSection.displayName = 'MenuSection';

/**
 * LogoutButton - Logout menu item
 */
const LogoutButton = memo(({ onLogout }) => (
  <button
    onClick={onLogout}
    className="w-full flex items-center gap-3 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
  >
    <LogOut size={14} />
    Terminate Session
  </button>
));

LogoutButton.displayName = 'LogoutButton';

/**
 * ProfileDropdown - User profile dropdown menu
 * @component
 * @param {Object} user - User object with name, role, avatar, id
 * @param {Function} onLogout - Callback when user logs out
 */
function ProfileDropdown({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleMenuItemClick = useCallback((callback) => {
    if (callback) callback();
    setIsOpen(false);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <ProfileButton user={user} isOpen={isOpen} onClick={handleToggle} />

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-brand-border rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <ProfileInfo user={user} />

              <MenuSection>
                <MenuItem icon={User} label="My Profile" />
                <MenuItem icon={Bell} label="Notifications" />
                <MenuItem icon={Settings} label="Preferences" />
              </MenuSection>

              <MenuSection divider>
                <LogoutButton onLogout={() => handleMenuItemClick(onLogout)} />
              </MenuSection>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(ProfileDropdown);