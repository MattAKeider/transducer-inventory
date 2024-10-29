import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import TransducerContextProvider from '../../src/context/TransducerContext';
import { server } from '../data/server';
import Home from "../../src/pages/Home";

describe('Home', () => {
  test('should render the Home component', async () => {
    render(
      <TransducerContextProvider>
        <Home />
      </TransducerContextProvider>
    );

    const spinner = await screen.findByTestId('circles-loading');
    expect(spinner).not.toBeVisible();
    
    const list = screen.getByRole('list');
    const items = await screen.findAllByRole('listitem');
    
    expect(list).toBeInTheDocument();
    expect(items.length).toBeGreaterThan(1);
  });

  test('should render MessagePage component on error', async () => {
    server.use(
      http.get('http://localhost:5000/api/transducers', () => {
        return HttpResponse.json({message: 'Internal Server Error'}, {status: 500});
      })
    );

    render(
      <TransducerContextProvider>
        <Home />
      </TransducerContextProvider>
    );

    const spinner = await screen.findByTestId('circles-loading');
    expect(spinner).not.toBeVisible();
    expect(screen.getByRole('heading')).toHaveTextContent(/something went wrong/i);
  });
});