import { describe, test, expect } from 'vitest';

import { filterBySearch, formatDate } from './utils';
import { TRANSDUCERS } from '../data/data';

describe('Utils', () => {
  test('should format date correctly', () => {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date();

    const formattedDate = formatDate(date);

    expect(formattedDate).toEqual(`${month[date.getMonth()].slice(0, 3)} ${date.getUTCDate()}, ${date.getFullYear()}`);
  });

  test('should format recieved input correctly', () => {
    const formattedDate = formatDate(new Date('2024-01-08'));
    expect(formattedDate).toEqual('Jan 8, 2024');
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
