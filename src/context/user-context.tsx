import { createContext, useState } from 'react';

export type UserContextType = {
  isNewUser: boolean;
  switchForm: () => void;
};

export const UserContext = createContext<UserContextType>({
  isNewUser: false,
  switchForm: () => {}
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

const UserContextProvider = ({children}: UserContextProviderProps) => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const handleSwitchForm = () => {
    setIsNewUser(prevState => !prevState);
  };

  const ctxValue: UserContextType = {
    isNewUser,
    switchForm: handleSwitchForm
  };

  return (
    <UserContext.Provider value={ctxValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;