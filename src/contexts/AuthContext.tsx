import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api, authApi } from '../services/api';
import { useLiff } from './LiffContext';

interface Customer {
  id: string;
  displayName: string;
  pictureUrl?: string;
  points: number;
  tier: string;
}

interface AuthContextType {
  token: string | null;
  customer: Customer | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  customer: null,
  isAuthenticated: false,
  isAuthLoading: false,
  setToken: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(
    localStorage.getItem('auth_token'),
  );
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { profile, accessToken, isLoggedIn } = useLiff();
  const hasExchanged = useRef(false);

  const setToken = (newToken: string) => {
    localStorage.setItem('auth_token', newToken);
    setTokenState(newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setTokenState(null);
    setCustomer(null);
    hasExchanged.current = false;
    delete api.defaults.headers.common['Authorization'];
  };

  // Set auth header from stored token on mount
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  // Exchange LIFF access token for backend JWT
  useEffect(() => {
    const exchangeToken = async () => {
      // Skip if already exchanged, already have a token, or not logged in
      if (hasExchanged.current || !isLoggedIn || !profile) return;

      // If we already have a stored token, just use it (session persists)
      if (token) {
        hasExchanged.current = true;
        return;
      }

      // Dev mode — no LIFF access token available, use mock
      if (!accessToken) {
        console.log('No LIFF access token — using dev mode mock customer');
        setCustomer({
          id: 'dev-customer-id',
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          points: 1500,
          tier: 'SILVER',
        });
        hasExchanged.current = true;
        return;
      }

      // Real LIFF flow — exchange the access token for a JWT via backend
      setIsAuthLoading(true);
      try {
        console.log('Exchanging LIFF access token for backend JWT...');
        const response: any = await authApi.lineTokenLogin(accessToken);

        // response = { accessToken: 'jwt...', customer: { id, displayName, ... } }
        const jwt = response.accessToken;
        const customerData = response.customer;

        setToken(jwt);
        setCustomer(customerData);
        hasExchanged.current = true;

        console.log(`Authenticated as: ${customerData.displayName} (${customerData.tier})`);
      } catch (err: any) {
        console.error('Failed to exchange LIFF token:', err?.response?.data || err.message);
        // Fallback: still show the app with LIFF profile data
        setCustomer({
          id: 'unknown',
          displayName: profile.displayName,
          pictureUrl: profile.pictureUrl,
          points: 0,
          tier: 'BRONZE',
        });
        hasExchanged.current = true;
      } finally {
        setIsAuthLoading(false);
      }
    };

    exchangeToken();
  }, [isLoggedIn, profile, accessToken, token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        customer,
        isAuthenticated: !!token || !!customer,
        isAuthLoading,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
