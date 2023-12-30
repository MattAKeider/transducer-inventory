import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Transducers from './Transducers';

describe('Transducers', () => {
  test('should render transducers', () => {
    render(<Transducers />);
    const list = document.querySelectorAll('li');
    expect(list.length).toBeGreaterThan(1);
  });
});
