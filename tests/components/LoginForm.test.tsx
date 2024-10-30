import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { act } from 'react';

import UserContextProvider from '../../src/context/UserContext';
import LoginForm from '../../src/components/LoginForm/LoginForm';
import { server } from '../data/server';

vi.mock('react-router-dom');

describe('LoginForm', () => {
  test('should render login form', () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');
    const username = screen.queryByRole('textbox', { name: /username/i });
    const confirm = screen.queryByLabelText('Confirm Password:');
    const signup = screen.getByText('Signup');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
    expect(username).not.toBeInTheDocument();
    expect(confirm).not.toBeInTheDocument();
    expect(signup).toHaveTextContent(/signup/i);
  });

  test('should render signup form', async () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const heading = screen.getByRole('heading');
    const signup = screen.getByText('Signup');
    
    const user = userEvent.setup();
    await act(() => user.click(signup));
    
    const username = screen.getByRole('textbox', { name: /username/i });
    const confirm = screen.getByLabelText('Confirm Password:');
    const login = screen.getByText('Login');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/create user/i);
    expect(username).toBeInTheDocument();
    expect(confirm).toBeInTheDocument();
    expect(login).toHaveTextContent(/login/i);
  });

  test('should reset fields on form switch', async () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const email = screen.getByRole('textbox', { name: /email/i });
    const signup = screen.getByText('Signup');

    const user = userEvent.setup();
    await act(() => user.type(email, 'tester'));

    expect(email).toHaveValue('tester');

    await act(() => user.click(signup));

    expect(email).toHaveValue('');
  });

  test('should navigate away on cancel', async () => {
    vi.mocked(useNavigate).mockImplementation(() => vi.fn());

    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const cancel = screen.getByRole('button', { name: /cancel/i});

    const user = userEvent.setup();
    await act(() => user.click(cancel));

    expect(useNavigate).toBeCalled();
  });

  test('should show password on double click', async () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const password = screen.getByLabelText(/password/i);

    const user = userEvent.setup();
    await act(() => user.type(password, 'Password7@'));

    expect(password).toHaveAttribute('type', 'password');

    await act(() => user.dblClick(password));

    expect(password).toHaveAttribute('type', 'text');
  });

  test('should render MessagePage component on error', async () => {
    server.use(
      http.post('http://localhost:5000/api/users/login', () => {
        return HttpResponse.json({message: 'Invalid credentials'}, {status: 401});
      })
    );

    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const button = screen.getByRole('button', { name: /submit/i});
    const email = screen.getByRole('textbox', { name: /email/i});
    const password = screen.getByLabelText(/password/i);
    
    const user = userEvent.setup();
    await act(() => user.type(email, 'tester@test.com'));
    await act(() => user.type(password, 'Tester809!!!'));
    await act(() => user.click(button));

    expect(screen.getByText(/invalid/i)).toHaveTextContent(/invalid credentials/i);
  });

  test('should login successfully', async () => {
    const spy = vi.spyOn(window, 'fetch');

    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const button = screen.getByRole('button', { name: /submit/i});
    const email = screen.getByRole('textbox', { name: /email/i});
    const password = screen.getByLabelText(/password/i);
    
    const user = userEvent.setup();
    await act(() => user.type(email, 'tester@test.com'));
    await act(() => user.type(password, 'Tester809!!!'));
    await act(() => user.click(button));

    const passedUrl = spy.mock.calls[0][0];
    expect(passedUrl).toBe('http://localhost:5000/api/users/login');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).not.toThrowError();
  });

  test('should signup successfully', async () => {
    const spy = vi.spyOn(window, 'fetch');

    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const signup = screen.getByText('Signup');
    
    const user = userEvent.setup();
    await act(() => user.click(signup));

    const button = screen.getByRole('button', { name: /submit/i});
    const email = screen.getByRole('textbox', { name: /email/i});
    const password = screen.getByLabelText('Password:');
    const username = screen.getByRole('textbox', { name: /username/i });
    const confirm = screen.getByLabelText('Confirm Password:');

    await act(() => user.type(username, 'tester'));
    await act(() => user.type(email, 'tester@test.com'));
    await act(() => user.type(password, 'Tester809!!!'));
    await act(() => user.type(confirm, 'Tester809!!!'));
    await act(() => user.click(button));

    const passedUrl = spy.mock.calls[0][0];
    expect(passedUrl).toBe('http://localhost:5000/api/users/signup');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).not.toThrowError();
  });

  test('should throw an error if passwords do not match', async () => {
    render(
      <UserContextProvider>
        <LoginForm />
      </UserContextProvider>
    );

    const signup = screen.getByText('Signup');
    
    const user = userEvent.setup();
    await act(() => user.click(signup));

    const button = screen.getByRole('button', { name: /submit/i});
    const email = screen.getByRole('textbox', { name: /email/i});
    const password = screen.getByLabelText('Password:');
    const username = screen.getByRole('textbox', { name: /username/i });
    const confirm = screen.getByLabelText('Confirm Password:');

    await act(() => user.type(username, 'tester'));
    await act(() => user.type(email, 'tester@test.com'));
    await act(() => user.type(password, 'Tester809!!!'));
    await act(() => user.type(confirm, 'Tester809!'));
    await act(() => user.click(button));

    expect(screen.getByText(/passwords must match/i)).toHaveTextContent(/passwords must match/i);
  });
});