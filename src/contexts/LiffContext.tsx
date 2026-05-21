import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import liff from '@line/liff';

interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

interface LiffContextType {
  liff: typeof liff | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isInClient: boolean;
  profile: LiffProfile | null;
  accessToken: string | null;
  error: string | null;
  login: () => void;
  logout: () => void;
}

const LiffContext = createContext<LiffContextType>({
  liff: null,
  isLoggedIn: false,
  isLoading: true,
  isInClient: false,
  profile: null,
  accessToken: null,
  error: null,
  login: () => {},
  logout: () => {},
});

export const useLiff = () => useContext(LiffContext);

export const LiffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInClient, setIsInClient] = useState(false);
  const [profile, setProfile] = useState<LiffProfile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;

        if (!liffId) {
          // Development mode — bypass LIFF
          console.warn('LIFF ID not configured. Running in development mode.');
          setIsLoggedIn(true);
          setProfile({
            userId: 'dev_user_001',
            displayName: 'Dev User',
            pictureUrl: undefined,
          });
          setAccessToken(null); // No real token in dev mode
          setIsLoading(false);
          return;
        }

        await liff.init({ liffId });

        setIsInClient(liff.isInClient());

        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);

          // Get the LIFF access token
          const token = liff.getAccessToken();
          setAccessToken(token);

          const liffProfile = await liff.getProfile();
          setProfile({
            userId: liffProfile.userId,
            displayName: liffProfile.displayName,
            pictureUrl: liffProfile.pictureUrl,
            statusMessage: liffProfile.statusMessage,
          });
        }
      } catch (err: any) {
        console.error('LIFF init error:', err);
        setError(err.message || 'Failed to initialize LIFF');
        // Fallback to dev mode
        setIsLoggedIn(true);
        setProfile({
          userId: 'dev_user_001',
          displayName: 'Dev User',
        });
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    initLiff();
  }, []);

  const login = useCallback(() => {
    if (liff.isInClient()) return;
    liff.login({ redirectUri: window.location.href });
  }, []);

  const logout = useCallback(() => {
    liff.logout();
    setIsLoggedIn(false);
    setProfile(null);
    setAccessToken(null);
    localStorage.removeItem('auth_token');
    window.location.reload();
  }, []);

  return (
    <LiffContext.Provider
      value={{
        liff: liff,
        isLoggedIn,
        isLoading,
        isInClient,
        profile,
        accessToken,
        error,
        login,
        logout,
      }}
    >
      {children}
    </LiffContext.Provider>
  );
};
