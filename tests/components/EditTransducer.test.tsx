import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import EditTransducer from '../../src/components/EditTransducer/EditTransducer';
import { CREATED_TRANSDUCER } from '../data/testData';
import { Transducer } from '../../src/models/model';

describe('EditTransducer', () => {
  test('should render the EditTransducer component', () => {
    render(
      <EditTransducer 
        transducer={CREATED_TRANSDUCER.transducer as Transducer} 
        condition='Working' 
        onCloseModal={vi.fn()} 
      />
    );

    const heading = screen.getByRole('heading');
  
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/edit transducer/i);
    expect(screen.getByLabelText('Name:')).toHaveValue('Test21');
  });

  test('should edit an existing transducer', async () => {
    const onCloseModal = vi.fn();

    render(
      <EditTransducer 
        transducer={CREATED_TRANSDUCER.transducer as Transducer} 
        condition='Working' 
        onCloseModal={onCloseModal} 
      />
    );

    const user = userEvent.setup();
    await act(() => user.type(screen.getByLabelText('Serial #:'), '0001-6701Z'));
    await act(() => fireEvent.submit(screen.getByTestId('form')));

    expect(onCloseModal).toHaveBeenCalledOnce();
  });

  test('should cancel editing a transducer', async () => {
    const onCloseModal = vi.fn();

    render(
      <EditTransducer 
        transducer={CREATED_TRANSDUCER.transducer as Transducer} 
        condition='Working' 
        onCloseModal={onCloseModal} 
      />
    );

    const input = screen.getByLabelText('Serial #:');

    const user = userEvent.setup();
    await act(() => user.type(input, '0001-6701Z'));
    await act(() => user.click(screen.getByRole('button', { name: 'Cancel'})));

    expect(onCloseModal).toHaveBeenCalledOnce();
    expect(input).toHaveValue('1');
  });
});