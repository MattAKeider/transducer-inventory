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
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setToken(null);
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