import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import NewTransducer from '../../src/components/NewTransducer/NewTransducer';

describe('NewTransducer', () => {
  test('should render NewTransducer component', () => {
    render(<NewTransducer onCloseModal={vi.fn()} />);

    const heading = screen.getByRole('heading');
  
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/new transducer/i);
  });

  test('should submit a new Transducer', async () => {
    const onCloseModal = vi.fn();

    render(<NewTransducer onCloseModal={onCloseModal} />);

    const name = screen.getByLabelText('Name:');
    const location = screen.getByLabelText('Location:');
    const department = screen.getByLabelText('Department:');
    const type = screen.getByLabelText('Type:');
    const room = screen.getByLabelText('Room:');
    const serial = screen.getByLabelText('Serial #:');
    const internal = screen.getByLabelText('Internal Identifier:');
    const control = screen.getByLabelText('Control #:');
    const received = screen.getByLabelText('Date Received:');
    const condition = screen.getByLabelText('Select Condition:');

    const user = userEvent.setup();
    await act(() => user.type(name, 'Test21'));
    await act(() => user.selectOptions(location, 'MIDTOWN'));
    await act(() => user.selectOptions(department, 'MFM'));
    await act(() => user.selectOptions(type, 'TA'));
    await act(() => user.type(room, '1'));
    await act(() => user.type(serial, '1'));
    await act(() => user.type(internal, '1'));
    await act(() => user.type(control, '1'));
    await act(() => user.type(received, '2024-11-02T00:00:00.000Z'));
    await act(() => user.selectOptions(condition, 'Working'));
    await act(() => fireEvent.submit(screen.getByTestId('form')));

    expect(onCloseModal).toHaveBeenCalledOnce();
  });

  
});