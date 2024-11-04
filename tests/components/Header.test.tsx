import { screen, render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

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
});