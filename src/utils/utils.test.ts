import { describe, test, expect } from 'vitest';

import { formatDate } from './utils';

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

    let formattedDate = formatDate(date);

    expect(formattedDate).toEqual(`${month[date.getMonth()].slice(0, 3)} ${date.getUTCDate()}, ${date.getFullYear()}`
    );
  });

  test('should format recieved input correctly', () => {
    let formattedDate = formatDate(new Date('2024-01-08'));
    expect(formattedDate).toEqual('Jan 8, 2024');
  });
});
