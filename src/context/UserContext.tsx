import { createContext, useCallback, useEffect, useState } from 'react';

import { setExpirationDate } from '../utils/utils';

export type UserContextType = {
  isLoggedIn: boolean;
  token: string;
  username: string;
  login: (token: string, expirationDate: Date, username: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  token: null,
  username: null,
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
  const [username, setUsername] = useState<string>(null);

  const handleLogin = useCallback((token: string, expirationDate: Date, username: string) => {
    if (!token) {
      return;
    }

    setToken(token);
    setUsername(username);

    // time till expiration of token, i.e., 3 hours
    const tokenExpDate = expirationDate || setExpirationDate(3);
    setTokenExpirationDate(tokenExpDate);

    // store in localstorage for persistant login until token expires
    localStorage.setItem('token', JSON.stringify({ token: token, expiration: tokenExpDate.toISOString() }));
    localStorage.setItem('username', JSON.stringify(username));

    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUsername(null);
    // clear token from localstorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');

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
    username,
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