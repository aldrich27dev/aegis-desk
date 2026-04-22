import { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';

// Import Page Components
import TicketsPage from './pages/TicketsPage';
import AIInsightsPage from './pages/AIInsightsPage';
import SecurityPage from './pages/SecurityPage';
import SettingsPage from './pages/SettingsPage';
import OverviewPage from './pages/OverviewPage';
import AuditPage from './pages/AuditPage';
import LoginPage from './pages/LoginPage';

// Import Global Components
import CommandCenter from './components/CommandCenter';
import NotificationToast from './components/NotificationToast';

export default function App() {
  // Auth State
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Toasts (temporary) and History (persistent in bell)
  const [toasts, setToasts] = useState([]);
  const [history, setHistory] = useState([]);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aegis_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse session", error);
        localStorage.removeItem('aegis_session');
      }
    }
  }, []);

  // Global Keyboard Shortcut: Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Combined Notification Logic
  const addNotification = (title, message, type = 'info') => {
    const id = Date.now();
    const newNotif = { id, title, message, type, time: 'Just now', read: false };
    
    setToasts(prev => [...prev, newNotif]);
    setHistory(prev => [newNotif, ...prev]);

    setTimeout(() => {
      setToasts(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(n => n.id !== id));
  const clearHistory = () => setHistory([]);

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('aegis_session', JSON.stringify(userData));
    addNotification("Access Granted", `Welcome back, ${userData.name}`, "success");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('aegis_session');
    setActiveTab('Overview');
    addNotification("Session Terminated", "You have been logged out safely.", "info");
  };

  // Helper to render pages
  const renderContent = () => {
    const pageProps = { 
      addNotification,
      setActiveTab,
      user 
    };

    switch (activeTab) {
      case 'Overview': return <OverviewPage {...pageProps} />;
      case 'Tickets': return <TicketsPage {...pageProps} />;
      case 'AI Insights': return <AIInsightsPage {...pageProps} />;
      case 'Security': return <SecurityPage {...pageProps} />;
      case 'Audit': return <AuditPage {...pageProps} />;
      case 'Settings': return <SettingsPage {...pageProps} />;
      default: return <OverviewPage {...pageProps} />;
    }
  };

  // If user is not authenticated, show only the Login Page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <MainLayout 
      user={user} 
      onLogout={handleLogout}
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onSearchOpen={() => setIsSearchOpen(true)}
      notifications={history}
      onClearHistory={clearHistory}
    >
      <CommandCenter 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={(page) => {
          setActiveTab(page);
          setIsSearchOpen(false);
        }} 
      />

      <NotificationToast 
        notifications={toasts} 
        removeNotification={removeToast} 
      />

      <div className="h-full">
        {renderContent()}
      </div>
    </MainLayout>
  );
}