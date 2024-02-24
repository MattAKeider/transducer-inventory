import { useContext, useEffect } from 'react';

import { TransducerContext, TransducerContextType } from '../store/transducer-context';
import EmptyScreen from '../components/EmptyScreen/EmptyScreen';
import Transducers from '../components/Transducers/Transducers';
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner';
import MessagePage from '../components/MessagePage/MessagePage';
import useHttp from '../hooks/useHttp';

const Home = () => {
  const { transducers, fetchTransducers } = useContext<TransducerContextType>(TransducerContext);
  const { sendRequest, isError, isLoading } = useHttp();

  useEffect(() => {
    async function getTransducers() {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/transducers');
        fetchTransducers(responseData.transducers);
      } catch (error) {
        console.log(error);
      }
    }

    getTransducers();
  }, [sendRequest]);

  let content: JSX.Element = <EmptyScreen />;

  if (transducers.length > 0) {
    content = <Transducers />;
  }

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      {!isLoading && isError && <MessagePage message="Something went wrong..." />}
      {!isLoading && !isError && content}
    </>
  );
};

export default Home;