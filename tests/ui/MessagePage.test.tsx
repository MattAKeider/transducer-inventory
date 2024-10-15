import { render, screen } from '@testing-library/react';

import MessagePage from '../../src/ui/MessagePage/MessagePage';

describe('MessagePage', () => {
  test('should render MessagePage component correctly without isError flag', () => {
    render(<MessagePage message="Invalid url" />);

    const heading = screen.queryByText('heading');
    const paragraph = screen.getByText(/invalid/i);

    expect(heading).not.toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });

  test('should render MessagePage component correctly with isError flag', () => {
    render(<MessagePage message="Invalid url" isError />);

    const heading = screen.getByRole('heading');
    const paragraph = screen.getByText(/invalid/i);

    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  });
});