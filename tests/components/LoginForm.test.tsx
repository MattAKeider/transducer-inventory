import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserContextProvider from '../../src/context/UserContext';
import LoginForm from '../../src/components/LoginForm/LoginForm';
import { act } from 'react';

vi.mock('react-router-dom');

describe('LoginForm', () => {
  test('should render login form', () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
  });

  test('should render sinup form', async () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');
    const toggle = screen.getByText('Signup');

    const user = userEvent.setup();

    await act(() => user.click(toggle));

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/create user/i);
  });
});