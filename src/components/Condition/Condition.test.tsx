import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Condition from './Condition';
import { TransducerCondition } from '../../data/data';

const testData: TransducerCondition = {
  condition: 'Working',
  conditionChangedDate: new Date('2023-11-17'),
  isRefurbished: false
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
    expect(date).toHaveTextContent('Nov 17, 2023');
  });

  test('should render "No" if transducer was refurbished', () => {
    render(<Condition transducerCondition={testData}/>);
    const refurbished = screen.getByTestId('refurbished');
    expect(refurbished).toHaveTextContent('No');
  });

  test('should render "Yes" if transducer was not refurbished', () => {
    testData.isRefurbished = true;
    render(<Condition transducerCondition={testData}/>);
    const refurbished = screen.getByTestId('refurbished');
    expect(refurbished).toHaveTextContent('Yes');
  });
});