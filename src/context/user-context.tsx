import { createContext, useCallback, useEffect, useState } from 'react';

export type UserContextType = {
  isLoggedIn: boolean;
  token: string;
  login: (token: string, expirationDate: Date) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {}
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

let logoutTimer;

const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
  const [token, setToken] = useState<string>(null);

  const handleLogin = useCallback((token: string, expirationDate: Date) => {
    if (!token) {
      return;
    }

    setToken(token);

    // time till expiration of token, i.e., 3 hours
    const tokenExpDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 180);
    setTokenExpirationDate(tokenExpDate);

    // store in localstorage for persistant login until token expires
    localStorage.setItem('token', JSON.stringify({ token: token, expiration: tokenExpDate.toISOString() }));

    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    // clear token from localstorage on logout
    localStorage.removeItem('token');

    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [token, handleLogout, tokenExpirationDate]);

  const ctxValue: UserContextType = {
    isLoggedIn,
    token,
    login: handleLogin,
    logout: handleLogout
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;