import { render } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';

import Transducers from './Transducers';
import { TransducerContext } from '../../store/transducer-context';
import { TRANSDUCERS } from '../../data/data';

describe('Transducers', () => {
  test('should render transducers', () => {
    render(
      <TransducerContext.Provider value={{transducers:TRANSDUCERS, addTransducer: () => {}, editTransducer: () => {}, deleteTransducer: () => {}}}>
        <Transducers />
      </TransducerContext.Provider>
    );

    const list = document.querySelectorAll('li');
    expect(list.length).toBeGreaterThan(1);
  });
});
