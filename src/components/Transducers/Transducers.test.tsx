import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import Transducers from './Transducers';
import { TransducerContext } from '../../context/transducer-context';
import { TRANSDUCERS } from '../../data/data';

describe.skip('Transducers', () => {
  test('should render empty state', () => {
    render(
      <TransducerContext.Provider value={{transducers:TRANSDUCERS, addTransducer: () => {}, fetchTransducers: () => {}, editTransducer: () => {}, deleteTransducer: () => {}}}>
        <Transducers />
      </TransducerContext.Provider>
    );

    const heading = screen.getByText('No Results');
    expect(heading).toHaveTextContent('No Results');
  });
});
