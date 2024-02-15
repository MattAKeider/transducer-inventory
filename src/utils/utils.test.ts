import { describe, test, expect } from 'vitest';

import { filterBySearch, formatDate } from './utils';
import { TRANSDUCERS } from '../data/data';

describe('Utils', () => {
  test('should format recieved input correctly', () => {
    const formattedDate = formatDate('2024-02-15T03:50:45.695Z');
    expect(formattedDate).toEqual('Feb 15, 2024');
  });

  test('should filter search correctly', () => {
    const results = filterBySearch('midtown', TRANSDUCERS);
    expect(results.length).toEqual(2);
  });

  test('should not return any results', () => {
    const results = filterBySearch('y', TRANSDUCERS);
    expect(results.length).toEqual(0);
  });
});
