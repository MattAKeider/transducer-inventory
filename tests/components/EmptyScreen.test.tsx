import { render, screen } from '@testing-library/react';

import { UserContext, UserContextType } from '../../src/context/UserContext';
import EmptyScreen from '../../src/components/EmptyScreen/EmptyScreen';

describe('EmptyScreen', () => {
  test('should render EmptyScreen component without logged in user', () => {
    render(<EmptyScreen />);

    expect(screen.getByText(/hmm/i)).toHaveTextContent('Hmm... go ahead and login...');
  });

  test('should render EmptyScreen component without logged in user', () => {
    const context: UserContextType = {
      isLoggedIn: true,
      token: '',
      username: '',
      login: vi.fn(),
      logout: vi.fn()
    };

    render(
      <UserContext.Provider value={context}>
        <EmptyScreen />
      </UserContext.Provider>
    );

    expect(screen.getByText(/hmm/i)).toHaveTextContent('Hmm... that add button must be important...');
  });
});