import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { act } from 'react';

import FullDetails from '../../src/components/FullDetails/FullDetails';
import { UserContext, UserContextType } from '../../src/context/UserContext';
import { CREATED_TRANSDUCER } from '../data/testData';
import { server } from '../data/server';

describe('FullDetails', () => {
  test('should render FullDetails component', () => {
    render(<FullDetails transducer={CREATED_TRANSDUCER.transducer} onCloseModal={vi.fn()} />);

    expect(screen.getByRole('heading')).toHaveTextContent(/test21/i);
    expect(screen.queryByRole('button', { name: 'Edit'})).not.toBeInTheDocument();
  });

  test('should render condition log', async () => {
    render(<FullDetails transducer={CREATED_TRANSDUCER.transducer} onCloseModal={vi.fn()} />);

    const conditions = await screen.findAllByTestId('condition');

    expect(conditions.length).toBe(3);
    conditions.map(condition => expect(condition).toHaveTextContent(condition.textContent));
  });

  test('should show edit button if logged in', () => {
    const context: UserContextType = {
      isLoggedIn: true,
      token: '',
      username: '',
      login: vi.fn(),
      logout: vi.fn()
    };
    
    render(
      <UserContext.Provider value={context}>
        <FullDetails transducer={CREATED_TRANSDUCER.transducer} onCloseModal={vi.fn()} />
      </UserContext.Provider>
    );

    expect(screen.getByRole('button', { name: 'Edit'})).toBeInTheDocument();
  });

  test('should open edit if clicked', async () => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.open = true;
    });

    const context: UserContextType = {
      isLoggedIn: true,
      token: '',
      username: '',
      login: vi.fn(),
      logout: vi.fn()
    };
    
    const onCloseModal = vi.fn();

    render(
      <UserContext.Provider value={context}>
        <FullDetails transducer={CREATED_TRANSDUCER.transducer} onCloseModal={onCloseModal} />
      </UserContext.Provider>
    );

    await screen.findAllByTestId('condition');
    const button = screen.getByRole('button', { name: 'Edit'});

    const user = userEvent.setup();
    await act(() => user.click(button));

    expect(onCloseModal).toHaveBeenCalledOnce();
  });

  test('should show error', async () => {
    server.use(
      http.get('http://localhost:5000/api/conditions/*', () => {
        return HttpResponse.json({message: 'Internal Server Error'}, {status: 500});
      })
    );
    
    render(<FullDetails transducer={CREATED_TRANSDUCER.transducer} onCloseModal={vi.fn()} />);
    
    const error = await screen.findByText(/error loading.../i);
    expect(error).toHaveTextContent(/error loading.../i);
  });
});