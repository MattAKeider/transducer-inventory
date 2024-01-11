import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import TransducerItem from './TransducerItem';
import { Transducer } from '../../data/data';

const testData: Transducer = {
  Id: crypto.randomUUID(),
  name: 'D1-4',
  location: 'CMC',
  department: 'MFM',
  transducerType: 'TV',
  room: '2',
  serialNumber: 'F123300',
  internalIdentifier: '7',
  controlNumber: '00FB-12346',
  dateReceived: new Date('2023-03-22'),
  notes: 'New from GE',
  currentCondition: [
    {
      conditionId: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: new Date('2023-03-22'),
      outOfService: false,
    },
  ]
};

describe('TransducerItem', () => {
  test('should contain correct name value', () => {
    render(<TransducerItem transducerData={testData} onClickTransducer={() => {}}/>);
    const header = screen.getByText('D1-4');
    expect(header).toHaveTextContent(testData.name);
  });

  test('should click on transducer item to open', async () => {
    const handleOpen = vi.fn();

    render(<TransducerItem transducerData={testData} onClickTransducer={handleOpen}/>);

    await userEvent.click(screen.getByRole('listitem'));
    
    expect(handleOpen).toBeCalledTimes(1);
  });
});
