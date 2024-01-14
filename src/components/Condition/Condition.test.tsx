import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Condition from './Condition';
import { TransducerCondition } from '../../data/data';

const testData: TransducerCondition = {
  conditionId: crypto.randomUUID(),
  condition: 'Working',
  conditionChangedDate: new Date('2024-01-8'),
};

describe('Condition', () => {
  test('should render the transducer condition', () => {
    render(<Condition transducerCondition={testData}/>);
    const condition = screen.getByTestId('condition');
    expect(condition).toBeInTheDocument();
  });

  test('should format the date correctly', () => {
    render(<Condition transducerCondition={testData}/>);
    const date = screen.getByTestId('date');
    expect(date).toHaveTextContent('Jan 8, 2024');
  });
});