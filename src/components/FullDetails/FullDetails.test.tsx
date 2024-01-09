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
  room: '2',
  serialNumber: 'F123300',
  internalIdentifier: '7',
  controlNumber: '00FB-12346',
  dateReceived: new Date(),
  notes: 'New from GE',
  currentCondition: [
    {
      conditionId: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: new Date(),
      outOfService: false,
    },
  ],
};

describe('FullDetails', () => {
  test('should render all transducer values', () => {
    render(<FullDetails transducer={testData} onCloseModal={() => {}}/>);

    expect(screen.getByRole('heading')).toHaveTextContent(testData.name);
    expect(screen.getByTestId('location')).toHaveTextContent(testData.location);
    expect(screen.getByTestId('department')).toHaveTextContent(testData.department);
    expect(screen.getByTestId('room')).toHaveTextContent(testData.room);
    expect(screen.getByTestId('serial')).toHaveTextContent(testData.serialNumber);
    expect(screen.getByTestId('internal')).toHaveTextContent(testData.internalIdentifier);
    expect(screen.getByTestId('control')).toHaveTextContent(testData.controlNumber);
    expect(screen.getByTestId('date-received')).toHaveTextContent('Jan 8, 2024');
    expect(screen.getByTestId('notes')).toHaveTextContent(testData.notes);
    expect(screen.getByTestId('condition')).toHaveTextContent(testData.currentCondition[0].condition);
    expect(screen.getByTestId('date')).toHaveTextContent('Jan 8, 2024');
    expect(screen.getByTestId('out-of-service')).toHaveTextContent('No');
  });

  test('should only contain one condition entry', () => {
    render(<FullDetails transducer={testData} onCloseModal={() => {}}/>);
    expect(screen.getAllByTestId('condition')).toHaveLength(1);
  });

  test('should close on button click', async () => {
    const handleClose = vi.fn();
    
    render(<FullDetails transducer={testData} onCloseModal={handleClose}/>);
    
    await userEvent.click(screen.getByText('Close'));

    expect(handleClose).toBeCalledTimes(1);
  });
});