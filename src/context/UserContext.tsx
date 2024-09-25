import { createContext, useEffect, useRef, useState } from 'react';

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

  const usernameRef = useRef<string>(null);
  const tokenRef = useRef<string>(null);
  const tokenExpirationDateRef = useRef<Date>();

  const handleLogin = (token: string, expirationDate: Date, username: string) => {
    if (!token) {
      return;
    }

    tokenRef.current = token;
    usernameRef.current = username;

    // time till expiration of token, i.e., 3 hours
    const tokenExpDate = expirationDate || setExpirationDate(3);
    tokenExpirationDateRef.current = tokenExpDate;

    // store in localstorage for persistant login until token expires
    localStorage.setItem('token', JSON.stringify({ token: tokenRef.current, expiration: tokenExpDate.toISOString() }));
    localStorage.setItem('username', JSON.stringify(username));

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    tokenRef.current = null;
    tokenExpirationDateRef.current = null;
    usernameRef.current = null;
    // clear token from localstorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (tokenRef.current && tokenExpirationDateRef.current) {
      const remainingTime = tokenExpirationDateRef.current.getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [tokenRef.current, tokenExpirationDateRef.current]);

  const ctxValue: UserContextType = {
    isLoggedIn,
    token: tokenRef.current,
    username: usernameRef.current,
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