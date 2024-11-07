import { render, screen } from '@testing-library/react'; 

import Condition from '../../src/components/Condition/Condition';
import { TransducerCondition } from '../../src/models/model';

const condition: TransducerCondition = {
  id: '672a4e6fa985878c1f52c68bzz',
  condition: 'New',
  conditionChangedDate: '2024-11-02T00:00:00.000Z',
  note: 'Newly created'
};

describe('Condition', () => {
  test('should render Condition component with all values', () => {
    render(<Condition transducerCondition={condition} />);

    expect(screen.getByTestId('condition')).toHaveTextContent('New');
    expect(screen.getByTestId('date')).toHaveTextContent('Nov 2, 2024');
    expect(screen.getByTestId('saved-note')).toHaveTextContent('Newly created');
  });

  test('should render Condition component without note', () => {
    condition.note = '';
    
    render(<Condition transducerCondition={condition} />);

    expect(screen.getByTestId('condition')).toHaveTextContent('New');
    expect(screen.getByTestId('date')).toHaveTextContent('Nov 2, 2024');
    expect(screen.queryByTestId('saved-note')).not.toBeInTheDocument();
  });
});