import { render, screen } from '@testing-library/react';

import ErrorMessage from "../../src/ui/ErrorMessage/ErrorMessage";

describe('ErrorMessage', () => {
  test('should render ErrorMessage component', () => {
    render(<ErrorMessage errorMessage='Something went wrong' />);

    const paragraph = screen.getByText(/something/i);

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(/something went wrong/i);
  });
});