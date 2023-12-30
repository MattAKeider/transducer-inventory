import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Header from './Header';

describe('Header', () => {
  test('should render a header title', () => {
    const text = 'Transducer Inventory';

    render(<Header />);
    const h1 = screen.getByText(text);
    expect(h1).toHaveTextContent(text);
  });
});
