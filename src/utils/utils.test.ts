import { describe, test, expect } from 'vitest';

import { formatDate, generateKey } from './utils';

describe('Utils', () => {
  test('should generate a key of type number', () => {
    const key = generateKey();
    expect(typeof key).toBe('number');
  });

  test('should generate a key over 100,000', () => {
    const key = generateKey();
    expect(key).toBeGreaterThanOrEqual(100000);
  });

  test('should format date correctly', () => {
    let formattedDate = formatDate(new Date('2023-03-22'));
    expect(formattedDate).toEqual('Mar 22, 2023');

    formattedDate = formatDate(new Date('2024-01-02T00:50:59.269Z'));
    expect(formattedDate).toEqual('Jan 02, 2024');
  });
});

