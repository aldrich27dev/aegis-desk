import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'System Admin',
    role: 'Lead Architect',
    id: 'USR-7700',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aegis',
    lastLogin: new Date().toISOString()
  });

  const logout = () => {
    // Logic for logout
    console.log("Session Terminated");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);