import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { act } from 'react';

import TransducerContextProvider, { TransducerContext, TransducerContextType } from '../../src/context/TransducerContext';
import { UserContext, UserContextType } from '../../src/context/UserContext';
import Transducers from '../../src/components/Transducers/Transducers';
import { TRANSDUCERS } from '../data/testData';
import { server } from '../data/server';

const userContext: UserContextType = {
  isLoggedIn: true,
  token: '',
  username: '',
  login: vi.fn(),
  logout: vi.fn()
};

const context: TransducerContextType = {
  transducers: TRANSDUCERS.transducers,
  addTransducer: () => {},
  fetchTransducers: () => {},
  deleteTransducer: () => {},
  editTransducer: () => {}
};

describe('Transducers', () => {
  test('should render the Transducers component without results', () => {
    render(
        <TransducerContextProvider>
          <Transducers />
        </TransducerContextProvider>
    );

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText(/no results/i)).toHaveTextContent(/no results/i);
  });

  test('should render the Transducers component with transducers', () => {
    render(
      <TransducerContext.Provider value={context}>
        <Transducers />
      </TransducerContext.Provider>
    );

    const titles = TRANSDUCERS.transducers.map(val => val.name);
    titles.forEach(val => expect(screen.getByText(val)).toHaveTextContent(val));
  });

  test('should filter by search text', async () => {
    render(
      <TransducerContext.Provider value={context}>
        <Transducers />
      </TransducerContext.Provider>
    );

    const user = userEvent.setup();
    await act(() => user.type(screen.getByRole('searchbox'), 'C1'));

    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2));
    expect(screen.getByText('C1-5')).toBeInTheDocument();
  });

  test('should open up transducer details on click', async () => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.open = true;
    });

    render(
      <TransducerContext.Provider value={context}>
        <Transducers />
      </TransducerContext.Provider>
    );

    const user = userEvent.setup();
    await act(() => user.click(screen.getAllByRole('listitem')[0]));

    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  test('should delete a transducer', async () => {
    window.confirm = vi.fn(() => true);
    const spy = vi.spyOn(window, 'fetch');

    render(
      <UserContext.Provider value={userContext}>
        <TransducerContext.Provider value={context}>
          <Transducers />
        </TransducerContext.Provider>
      </UserContext.Provider>
    );

    const icon = screen.getAllByTestId('delete');

    const user = userEvent.setup();
    await act(() => user.click(icon[0]));

    const statusMethod = spy.mock.calls[0][1].method;

    expect(statusMethod).toMatch('DELETE');
    expect(spy).toHaveBeenCalledOnce();
  });

  test('should fail to delete', async () => {
    server.use(
      http.delete('http://localhost:5000/api/transducers/*', () => {
        return HttpResponse.json({message: 'Internal Server Error'}, {status: 500});
      })
    );
    
    window.confirm = vi.fn(() => true);
    const spy = vi.spyOn(window, 'fetch');

    render(
      <UserContext.Provider value={userContext}>
        <TransducerContext.Provider value={context}>
          <Transducers />
        </TransducerContext.Provider>
      </UserContext.Provider>
    );

    const icon = screen.getAllByTestId('delete');

    const user = userEvent.setup();
    await act(() => user.click(icon[0]));

    const statusMethod = spy.mock.calls[0][1].method;

    expect(statusMethod).toMatch('DELETE');
    expect(spy).toHaveBeenCalledOnce();
    expect(screen.getByText(/please reload page/i)).toHaveTextContent(/internal server Error please reload page/i);
  });
});