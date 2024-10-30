import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

import UserContextProvider from '../../src/context/UserContext';
import LoginForm from '../../src/components/LoginForm/LoginForm';
import { act } from 'react';

vi.mock('react-router-dom');

describe('LoginForm', () => {
  beforeEach(() => {
    vi.mocked(useNavigate).mockImplementation(() => vi.fn());

    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );
  });

  test('should render login form', () => {
    const heading = screen.getByRole('heading');
    const username = screen.queryByRole('textbox', { name: /username/i });
    const confirm = screen.queryByLabelText(/confirm password/i);
    const signup = screen.getByText('Signup');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
    expect(username).not.toBeInTheDocument();
    expect(confirm).not.toBeInTheDocument();
    expect(signup).toHaveTextContent(/signup/i);
  });

  test('should render sinup form', async () => {
    const heading = screen.getByRole('heading');
    const signup = screen.getByText('Signup');
    
    const user = userEvent.setup();
    await act(() => user.click(signup));
    
    const username = screen.getByRole('textbox', { name: /username/i });
    const confirm = screen.getByLabelText(/confirm password/i);
    const login = screen.getByText('Login');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/create user/i);
    expect(username).toBeInTheDocument();
    expect(confirm).toBeInTheDocument();
    expect(login).toHaveTextContent(/login/i);
  });

  test('should reset fields on form switch', async () => {
    const email = screen.getByRole('textbox', { name: /email/i });
    const signup = screen.getByText('Signup');

    const user = userEvent.setup();
    await act(() => user.type(email, 'tester'));

    expect(email).toHaveValue('tester');

    await act(() => user.click(signup));

    expect(email).toHaveValue('');
  });

  test('should navigate away on cancel', async () => {
    const cancel = screen.getByRole('button', { name: /cancel/i});

    const user = userEvent.setup();
    await act(() => user.click(cancel));

    expect(useNavigate).toBeCalled();
  });

  test('should show password on double click', async () => {
    const password = screen.getByLabelText(/password/i);

    const user = userEvent.setup();
    await act(() => user.type(password, 'Password7@'));

    expect(password).toHaveAttribute('type', 'password');

    await act(() => user.dblClick(password));

    expect(password).toHaveAttribute('type', 'text');
  });
});