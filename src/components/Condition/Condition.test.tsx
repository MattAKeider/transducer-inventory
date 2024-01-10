import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Condition from './Condition';
import { TransducerCondition } from '../../data/data';

const testData: TransducerCondition = {
  conditionId: crypto.randomUUID(),
  condition: 'Working',
  conditionChangedDate: new Date('2024-01-8'),
  outOfService: false
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

  test('should render "No" if transducer is not "Out of Service"', () => {
    render(<Condition transducerCondition={testData}/>);
    const outOfService = screen.getByTestId('out-of-service');
    expect(outOfService).toHaveTextContent('No');
  });

  test('should render "Yes" if transducer is "Out of Service"', () => {
    testData.outOfService = true;
    render(<Condition transducerCondition={testData}/>);
    const outOfService = screen.getByTestId('out-of-service');
    expect(outOfService).toHaveTextContent('Yes');
  });
});