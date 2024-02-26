import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import TransducerContextProvider from '../context/transducer-context';
import UserContextProvider from '../context/user-context';

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
