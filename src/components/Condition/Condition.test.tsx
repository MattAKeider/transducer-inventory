import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Condition from './Condition';
import { TransducerCondition } from '../../data/data';

const testData: TransducerCondition = {
  id: crypto.randomUUID(),
  condition: 'Working',
  conditionChangedDate: '2024-02-15T03:50:45.695Z',
  note: 'This transducer is brand new from the factory.',
};

describe('Condition', () => {
  test('should render the transducer condition', () => {
    render(<Condition transducerCondition={testData}/>);
    const p = screen.getByTestId('condition');
    expect(p).toBeInTheDocument();
  });

  test('should format the date correctly', () => {
    render(<Condition transducerCondition={testData}/>);
    const p = screen.getByTestId('date');
    expect(p).toHaveTextContent('Feb 15, 2024');
  });

  test('should render the transducer note if given', () => {
    render(<Condition transducerCondition={testData}/>);
    const p = screen.getByTestId('saved-note');
    expect(p).toHaveTextContent('This transducer is brand new from the factory.');
  });

  test('should not render the transducer note if empty', () => {
    testData.note = '';
    render(<Condition transducerCondition={testData}/>);
    const p = screen.queryByTestId('saved-note');
    expect(p).not.toBeInTheDocument();
  });
});