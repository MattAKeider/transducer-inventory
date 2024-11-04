import { screen, render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import UserContextProvider, { UserContext, UserContextType } from '../../src/context/UserContext';
import Header from '../../src/components/Header/Header';

vi.mock('react-router-dom');

const context: UserContextType = {
  isLoggedIn: true,
  token: 'zzzzzyyysiiiopwvfd',
  username: 'tester',
  login: vi.fn(),
  logout: vi.fn()
};

describe('Header', () => {
  beforeEach(() => {
    window.innerWidth = 1000;
    vi.mocked(useNavigate).mockImplementation(() => vi.fn());
  });

  test('should render the Header component', () => {
    render(
      <UserContextProvider>
        <Header />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/transducer inventory/i);
    expect(screen.getByRole('button')).toHaveTextContent(/login/i);
  });

  test('should render Header component as a logged in user', () => {
    render(
      <UserContext.Provider value={context}>
        <Header />
      </UserContext.Provider>
    );

    expect(screen.getByText(/welcome/i)).toHaveTextContent(/welcome, tester/i);
    expect(screen.getByRole('button', { name: 'Logout'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add'})).toBeInTheDocument();
  });

  test('should render the mobile view', () => {
    window.innerWidth = 800;

    render(
      <UserContextProvider>
        <Header />
      </UserContextProvider>
    );

    expect(screen.getByTestId('menu')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Login'})).not.toBeInTheDocument();
  });

  test('should open the navigation panel on mobile view', async () => {
    window.innerWidth = 800;

    render(
      <UserContextProvider>
        <Header />
      </UserContextProvider>
    );

    expect(screen.getByTestId('menu')).toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(screen.getByTestId('menu')));

    expect(screen.getByRole('button', { name: 'Login'})).toBeInTheDocument();
  });

  test('should open the navigation panel on mobile view as logged in', async () => {
    window.innerWidth = 800;

    render(
      <UserContext.Provider value={context}>
        <Header />
      </UserContext.Provider>
    );

    expect(screen.getByTestId('menu')).toBeInTheDocument();

    const user = userEvent.setup();
    await act(() => user.click(screen.getByTestId('menu')));

    expect(screen.getByText(/welcome/i)).toHaveTextContent(/welcome, tester/i);
    expect(screen.getByRole('button', { name: 'Logout'})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add'})).toBeInTheDocument();
  });

  test('should open and close New Transducer form', async () => {
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.open = true;
    });

    render(
      <UserContext.Provider value={context}>
        <Header />
      </UserContext.Provider>
    );

    const user = userEvent.setup();
    await act(() => user.click(screen.getByRole('button', { name: 'Add'})));

    expect(screen.getByRole('dialog')).toBeVisible();
  });

  test('should go to login on click', async () => {
    render(
      <UserContextProvider>
        <Header />
      </UserContextProvider>
    );

    const user = userEvent.setup();
    await act(() => user.click(screen.getByRole('button', { name: 'Login'})));

    expect(vi.mocked(useNavigate)).toBeCalled();
  });

  test('should logout on click', async () => {
    render(
      <UserContext.Provider value={context}>
        <Header />
      </UserContext.Provider>
    );

    const user = userEvent.setup();
    await act(() => user.click(screen.getByRole('button', { name: 'Logout'})));

    expect(context.logout).toHaveBeenCalled();
  });

  test('should login when given valid localstorage values', () => {
    vi.setSystemTime('2024-11-08T01:13:34.000Z');

    const token = {token: 'sdeertcssffres', expiration: '2024-11-15T03:50:45.695Z'};
    localStorage.setItem('token', JSON.stringify(token));

    const spy = vi.spyOn(context, 'login');

    render(
      <UserContext.Provider value={context}>
        <Header />
      </UserContext.Provider>
    );

    const arg = spy.mock.calls[0][0];

    expect(spy).toHaveBeenCalledOnce();
    expect(arg).toBe('sdeertcssffres');
  });
});