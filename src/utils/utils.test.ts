import { describe, test, expect } from 'vitest';

import { formatDate } from './utils';

describe('Utils', () => {
  test('should format date correctly', () => {
    let formattedDate = formatDate(new Date('2023-03-22'));
    expect(formattedDate).toEqual('Mar 22, 2023');

    formattedDate = formatDate(new Date('2024-01-02T00:50:59.269Z'));
    expect(formattedDate).toEqual('Jan 02, 2024');
  });
});

