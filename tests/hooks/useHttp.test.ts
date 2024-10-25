import { act } from 'react';
import { renderHook } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '../data/server';
import { TRANSDUCERS } from '../data/testData';
import useHttp from '../../src/hooks/useHttp';

describe('useHttp', () => {
  test('should render useHttp hook with default values', () => {
    const { result } = renderHook(useHttp);
    const {isLoading, error} = result.current;
    
    expect(isLoading).toBe(false);
    expect(error).toBe(null);
  });

  test('should verify sendRequest makes http request', async () => {
    let dataResponse: HttpResponse;
    const { result } = renderHook(useHttp);
    const { sendRequest } = result.current;

    await act(async () => {
      dataResponse = await sendRequest('/transducers');
    });

    const { error } = result.current;

    expect(dataResponse).toEqual(TRANSDUCERS);
    expect(error).toBe(null);
  });

  test('should verify sendRequest returns error on failed request', async () => {
    let dataResponse: HttpResponse;

    server.use(
      http.get('/transducers', () => {
        return HttpResponse.json({message: 'Internal Server Error'}, {status: 500});
      })
    );

    const { result } = renderHook(useHttp);
    const { sendRequest } = result.current;

    await act(async () => {
      dataResponse = await sendRequest('/transducers');
    });

    const { error } = result.current;

    expect(dataResponse).toEqual(undefined);
    expect(error).toEqual(Error('Internal Server Error'));
  });

  test('should setError', async () => {
    const { result } = renderHook(useHttp);
    const { setError, error } = result.current;
    
    expect(error).toBe(null);

    await act(async () => {
      setError(Error('Passwords must match'));
    });

    const { error: reRenderedError } = result.current;

    expect(reRenderedError).toEqual(Error('Passwords must match'));
  });
});