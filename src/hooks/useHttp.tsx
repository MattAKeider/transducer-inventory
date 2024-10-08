import { useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);

  const sendRequest = async (url: string, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body
      });
  
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong...');
      }

      setIsLoading(false);

      return responseData;
    } catch (e) {
      setIsLoading(false);
      setError(e);
    }
  };

  return { isLoading, error, setError, sendRequest };
};

export default useHttp;