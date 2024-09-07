import { describe, test, expect, vitest } from 'vitest';

import { filterBySearch, formatDate, setExpirationDate } from './utils';
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

  test('should set expiration date to 3 hours from current date', () => {
    vitest.setSystemTime('2024-09-08T01:13:34.000Z');
    expect(setExpirationDate(3).getTime() - new Date().getTime()).toBe(10800000);
  });

  test('should expire in 1 hour if hoursTillExpiration is greater than 24 hours', () => {
    vitest.setSystemTime('2024-09-08T01:13:34.000Z');
    expect(setExpirationDate(32).getTime()).toBe(new Date().getTime() + 3600000);
  });

  test('should expire in 1 hour if hoursTillExpiration is a negative number', () => {
    vitest.setSystemTime('2024-09-08T01:13:34.000Z');
    expect(setExpirationDate(-2).getTime()).toBe(new Date().getTime() + 3600000);
  });
});
