import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Added user, onLogout, onSearchOpen, notifications, and onClearHistory to props
export default function MainLayout({ 
  children, 
  activeTab, 
  setActiveTab, 
  user, 
  onLogout, 
  onSearchOpen, 
  notifications, 
  onClearHistory 
}) {
  return (
    <div className="flex h-screen w-full bg-brand-bg overflow-hidden text-sm">
      {/* Sidebar handles navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-col flex-1 min-w-0">
        {/* Pass all necessary props to Header. 
            This fixes the "avatar of undefined" error because the Header 
            will now have the 'user' object to pass to the ProfileDropdown.
        */}
        <Header 
          user={user} 
          onLogout={onLogout} 
          onSearchOpen={onSearchOpen} 
          notifications={notifications} 
          onClearHistory={onClearHistory} 
        />
        
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}