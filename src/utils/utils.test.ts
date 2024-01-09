import { describe, test, expect } from 'vitest';

import { formatDate } from './utils';

describe('Utils', () => {
  test('should format date correctly', () => {
    let formattedDate = formatDate(new Date('Mon Jan 08 2024 22:19:58'));
    expect(formattedDate).toEqual('Jan 8, 2024');
  });
});

