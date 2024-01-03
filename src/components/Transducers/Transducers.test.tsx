import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';

import Transducers from './Transducers';

describe('Transducers', () => {
  beforeEach(() => {
    // Test environment doesn't use know where the modal is within index.html
    const modalEl = document.createElement('div');
    modalEl.setAttribute('id', 'modal');
    document.body.appendChild(modalEl);
  });

  test('should render transducers', () => {
    render(<Transducers />);
    const list = document.querySelectorAll('li');
    expect(list.length).toBeGreaterThan(1);
  });
});
