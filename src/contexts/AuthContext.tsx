import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useLiff } from './LiffContext';

interface AuthContextType {
  token: string | null;
  customer: any | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  customer: null,
  isAuthenticated: false,
  setToken: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('auth_token'),
  );
  const [customer, setCustomer] = useState<any | null>(null);
  const { profile, isLoggedIn } = useLiff();

  const setToken = (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    setTokenState(newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setTokenState(null);
    setCustomer(null);
    delete api.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    // If logged in with LIFF but no API token, exchange for token
    if (isLoggedIn && profile && !token) {
      // For dev mode, set a mock token
      if (profile.userId === 'dev_user_001') {
        setCustomer({
          id: 'dev-customer-id',
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          points: 1500,
          tier: 'SILVER',
        });
      }
    }
  }, [isLoggedIn, profile, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        customer,
        isAuthenticated: !!token || !!customer,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
