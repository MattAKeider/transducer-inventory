import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import TransducerContextProvider from '../context/TransducerContext';
import UserContextProvider from '../context/UserContext';

const Root = () => {
  return (
    <UserContextProvider>
      <TransducerContextProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </TransducerContextProvider>
    </UserContextProvider>
  );
};

export default Root;
