import { render, screen } from '@testing-library/react';

import LoadingSpinner from '../../src/ui/LoadingSpinner/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('should not be visible', () => {
    render(<LoadingSpinner loading={false} />);

    const spinner = screen.getByLabelText('circles-loading');

    expect(spinner).toBeInTheDocument();
    expect(spinner).not.toBeVisible();
  });

  test('should be visible', () => {
    render(<LoadingSpinner loading={true} />);

    const spinner = screen.getByLabelText('circles-loading');

    expect(spinner).toBeInTheDocument();
    expect(spinner).toBeVisible();
  });
});