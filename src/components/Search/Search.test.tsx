import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import Search from './Search';

describe('Search', () => {
  test('should contain search value', () => {
    const value = 'midtown';
    const handleOnChange = vi.fn();

    render(<Search searchValue={value} onChangeSearch={handleOnChange}/>);

    const input = screen.getByRole<HTMLInputElement>('searchbox');
    expect(input.value).toContain('midtown');
  });
});