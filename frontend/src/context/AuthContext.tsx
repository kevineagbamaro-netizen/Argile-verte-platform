import React, { createContext, useContext, useMemo, useState } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
  }) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'argile-verte-user';

function readUser(): User | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(readUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: async (email, password) => {
        const next = await api.login(email, password);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setUser(next);
        return next;
      },
      register: async (payload) => {
        const next = await api.register(payload);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setUser(next);
        return next;
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
