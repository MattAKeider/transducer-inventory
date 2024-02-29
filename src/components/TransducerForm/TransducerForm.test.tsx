import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import TransducerForm from './TransducerForm';
import { FormState } from '../../utils/formUtils';

const testData: FormState = {
  name: 'C3-45',
  location: 'MIDTOWN',
  department: 'MFM',
  room: '1',
  type: 'VT',
  serial: '0002-342F',
  internal: 'TA321',
  control: 'TA376200T',
  condition: 'Working',
  notes: 'New from manufacturer',
  service: false,
  received: '2050 20 12',
};

describe('TransducerForm', () => {
  test('inputs should contain the correct values', () => {
    const handleEvent = vi.fn();

    render(<TransducerForm formState={testData} dispatchAction={() => {}} isNew={true} onSubmitForm={handleEvent} onEscForm={handleEvent} onCancelForm={handleEvent} error='Please enter valid date..' />);

    const nameInput = screen.getByLabelText<HTMLInputElement>('Name:');
    const serialInput = screen.getByLabelText<HTMLInputElement>('Serial #:');

    expect(nameInput.value).toBe('C3-45');
    expect(serialInput.value).toBe('0002-342F');
  });

  test('should contain the correct heading if a "New" form,', () => {
    const handleEvent = vi.fn();

    render(<TransducerForm formState={testData} dispatchAction={() => {}} isNew={true} onSubmitForm={handleEvent} onEscForm={handleEvent} onCancelForm={handleEvent} error='Please enter valid date..' />);

    const h1 = screen.getByText('New Transducer');
    expect(h1).toBeInTheDocument();
  });

  test('should contain the correct heading if an "Edit" form,', () => {
    const handleEvent = vi.fn();

    render(<TransducerForm formState={testData} dispatchAction={() => {}} isNew={false} onSubmitForm={handleEvent} onEscForm={handleEvent} onCancelForm={handleEvent} error='Please enter valid date..' />);

    const h1 = screen.getByText<HTMLElement>('Edit Transducer');
    expect(h1).toBeInTheDocument();
  });

  test('should give error on wrong date given', () => {
    const handleEvent = vi.fn();

    render(<TransducerForm formState={testData} dispatchAction={() => {}} isNew={true} onSubmitForm={handleEvent} onEscForm={handleEvent} onCancelForm={handleEvent} error='Please enter valid date..' />);

    const error = screen.getByText<HTMLElement>('Please enter valid date.');

    expect(error).toBeInTheDocument();

  });
});