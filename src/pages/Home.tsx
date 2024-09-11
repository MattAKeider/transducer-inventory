import { useContext, useEffect, useState } from 'react';

import {
  TransducerContext,
  TransducerContextType,
} from '../context/TransducerContext';
import EmptyScreen from '../components/EmptyScreen/EmptyScreen';
import Transducers from '../components/Transducers/Transducers';
import LoadingSpinner from '../ui/LoadingSpinner/LoadingSpinner';
import MessagePage from '../ui/MessagePage/MessagePage';
import useHttp from '../hooks/useHttp';

const Home = () => {
  const { transducers, fetchTransducers } =
    useContext<TransducerContextType>(TransducerContext);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const { sendRequest, isLoading } = useHttp();

  useEffect(() => {
    async function getTransducers() {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_API_URL}/transducers`
        );
        fetchTransducers(responseData.transducers);
      } catch (error) {
        setErrorMessage(error.message);
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
      {!isLoading && errorMessage && (
        <MessagePage message={errorMessage} isError />
      )}
      {!isLoading && !errorMessage && content}
    </>
  );
};

export default Home;
