import { describe, test, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import FullDetails from './FullDetails';
import { Transducer } from '../../data/data';

const testData: Transducer = {
  id: crypto.randomUUID(),
  name: 'D1-4',
  location: 'CMC',
  department: 'MFM',
  transducerType: 'TA',
  room: '2',
  serialNumber: 'F123300',
  internalIdentifier: '7',
  controlNumber: '00FB-12346',
  dateReceived: '2024-02-15T03:50:45.695Z',
  outOfService: false,
  currentCondition: [
    {
      id: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: '2024-02-15T03:50:45.695Z',
      note: 'New transducer from company',
    },
  ],
};

describe('FullDetails', () => {
  test('should render all transducer values', () => {
    render(<FullDetails transducer={testData} onCloseModal={() => {}}/>);

    expect(screen.getByRole('heading')).toHaveTextContent(testData.name);
    expect(screen.getByTestId('location')).toHaveTextContent(testData.location);
    expect(screen.getByTestId('department')).toHaveTextContent(testData.department);
    expect(screen.getByTestId('type')).toHaveTextContent(testData.transducerType);
    expect(screen.getByTestId('room')).toHaveTextContent(testData.room);
    expect(screen.getByTestId('serial')).toHaveTextContent(testData.serialNumber);
    expect(screen.getByTestId('internal')).toHaveTextContent(testData.internalIdentifier);
    expect(screen.getByTestId('control')).toHaveTextContent(testData.controlNumber);
    expect(screen.getByTestId('date-received')).toHaveTextContent('Feb 15, 2024');
  });

  test('should close on button click', async () => {
    const handleClose = vi.fn();
    
    render(<FullDetails transducer={testData} onCloseModal={handleClose}/>);
    
    await userEvent.click(screen.getByText('Close'));

    expect(handleClose).toBeCalledTimes(1);
  });
});