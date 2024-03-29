import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
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
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }, []);

  return { isLoading, sendRequest };
};

export default useHttp;