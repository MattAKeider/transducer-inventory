import { createContext, useState } from 'react';

export type UserContextType = {
  isLoggedIn: boolean;
  token: string;
  login: (token: string) => void;
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

const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>(null);

  const handleLogin = (token: string) => {
    if (!token) {
      return;
    }

    setToken(token);

    // store in localstorage for persistant login until token expires
    localStorage.setItem('token', JSON.stringify(token));

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken(null);

    // clear token from localstorage on logout
    localStorage.removeItem('token');

    setIsLoggedIn(false);
  };

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