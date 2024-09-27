import { useContext, useEffect } from 'react';

import { TransducerContext, TransducerContextType } from '../context/TransducerContext';
import EmptyScreen from '../components/EmptyScreen/EmptyScreen';
import Transducers from '../components/Transducers/Transducers';
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner';
import MessagePage from '../ui/MessagePage/MessagePage';
import useHttp from '../hooks/useHttp';

const Home = () => {
  const { transducers, fetchTransducers } = useContext<TransducerContextType>(TransducerContext);
  const { sendRequest, isLoading, error } = useHttp();

  useEffect(() => {
    async function getTransducers() {
      const responseData = await sendRequest(`${import.meta.env.VITE_API_URL}/transducers`);
  
      if (responseData) {
        fetchTransducers(responseData.transducers);
      }
    }

    getTransducers();
  }, []);

  let content: JSX.Element = <EmptyScreen />;

  if (transducers.length > 0) {
    content = <Transducers />;
  }

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      {!isLoading && error && (
        <MessagePage message={error.message} isError />
      )}
      {!isLoading && !error && content}
    </>
  );
};

export default Home;
