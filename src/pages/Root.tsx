import { Outlet } from 'react-router-dom';

import Header from '../components/Header/Header';
import TransducerContextProvider from '../store/transducer-context';

const Root = () => {
  return (
    <TransducerContextProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </TransducerContextProvider>
  );
};

export default Root;
