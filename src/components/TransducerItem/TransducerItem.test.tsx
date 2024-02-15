import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import TransducerItem from './TransducerItem';
import { Transducer } from '../../data/data';

const testData: Transducer = {
  id: crypto.randomUUID(),
  name: 'D1-4',
  location: 'CMC',
  department: 'MFM',
  transducerType: 'TV',
  room: '2',
  serialNumber: 'F123300',
  internalIdentifier: '7',
  controlNumber: '00FB-12346',
  dateReceived: '',
  outOfService: false,
  currentCondition: [
    {
      id: crypto.randomUUID(),
      condition: 'Working',
      conditionChangedDate: '',
      note: '',
    },
  ]
};

describe('TransducerItem', () => {
  test('should contain correct name value', () => {
    render(<TransducerItem transducerData={testData} onClickTransducer={() => {}} onClickDelete={() => {}} />);
    const header = screen.getByText('D1-4');
    expect(header).toHaveTextContent(testData.name);
  });

  test('should click on transducer item to open', async () => {
    const handleOpen = vi.fn();

    render(<TransducerItem transducerData={testData} onClickTransducer={handleOpen} onClickDelete={() => {}} />);

    await userEvent.click(screen.getByRole('listitem'));
    
    expect(handleOpen).toBeCalledTimes(1);
  });
});
