import { cleanup, render, screen } from '@testing-library/react';
import { useContext, useEffect } from 'react';

import UserContextProvider, { UserContext } from '../../src/context/UserContext';

const TestComponent = ({ loginUser }: { loginUser: boolean }) => {
  const { isLoggedIn, username, login, logout } = useContext(UserContext);
  
  useEffect(() => {
    if (loginUser) {
      login('testtokenstringzzzzzzzzz', new Date('2024-09-12T01:13:34.000Z'), 'testuser');
    } else {
      logout();
    }
    
  }, [loginUser]);

  return (
    <div>
      <h1>{ username ? `Hello, ${username}!` : 'Login' }</h1>
      <p>{ isLoggedIn ? 'Test user logged in' : 'User not logged in' }</p>
    </div>
  );
};

describe('UserContextProvider', () => {
  beforeEach(() => {
    cleanup();
  });

  test('should render TestComponent using the UserContextProvider login', () => {
    render(
      <UserContextProvider>
        <TestComponent loginUser={true} />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByText('Test user logged in');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/testuser/i);
    expect(paragraph).toHaveTextContent(/logged in/i)
  });

  test('should render TestComponent using the UserContextProvider logout', () => {
    render(
      <UserContextProvider>
        <TestComponent loginUser={false} />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByText('User not logged in');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
    expect(paragraph).toHaveTextContent(/not logged in/i)
  });
});