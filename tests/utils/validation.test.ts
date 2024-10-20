import { isValidDate } from '../../src/utils/validation';

describe('Validation', () => {
  test('should have a valid date', () => {
    const isValid = isValidDate('2023-01-22');
    expect(isValid).toBeTruthy();
  });

  test('should not have a valid date', () => {
    const isValid = isValidDate('2050-01-22');
    expect(isValid).toBeFalsy();
  });
});
