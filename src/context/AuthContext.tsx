import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types';
import { users, VALID_LOGIN } from '@/utils/data';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('leadflow_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback((email: string, password: string): boolean => {
    if (email === VALID_LOGIN.email && password === VALID_LOGIN.password) {
      const foundUser = users.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('leadflow_user', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('leadflow_user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
