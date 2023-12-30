import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import TransducerItem from './TransducerItem';
import { TRANSDUCERS } from '../../data/data';

describe('TrasducerItem', () => {
  const transducer = TRANSDUCERS[0];

  test('should contain correct name value', () => {
    render(<TransducerItem transducerData={transducer} />);
    const itemName = screen.getByText(transducer.name);
    expect(itemName).toHaveTextContent(transducer.name);
  });
});
