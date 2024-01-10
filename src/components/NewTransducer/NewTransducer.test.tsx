import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import NewTransducer from './NewTransducer';

describe('NewTransducer', () => {
  test('inputs should contain the correct values', () => {
    const handleClose = vi.fn();

    render(<NewTransducer onCloseModal={handleClose} />);

    const nameInput = screen.getByLabelText<HTMLInputElement>('Name:');
    fireEvent.change(nameInput, {target: {value: 'C3-45'}});

    const serialInput = screen.getByLabelText<HTMLInputElement>('Serial #:');
    fireEvent.change(serialInput, {target: {value: '00032VY'}});

    expect(nameInput.value).toBe('C3-45');
    expect(serialInput.value).toBe('00032VY');
  });
});