import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';

import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    // Test environment doesn't use know where the modal is within index.html
    const modalEl = document.createElement('div');
    modalEl.setAttribute('id', 'modal');
    document.body.appendChild(modalEl);
  });

  test('should render a header title', () => {
    const text = 'Transducer Inventory';

    render(<Header/>);
    const h1 = screen.getByText(text);
    expect(h1).toHaveTextContent(text);
  });
});
