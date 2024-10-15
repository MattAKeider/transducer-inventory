import { render, screen } from '@testing-library/react';

import Textarea from '../../src/ui/Textarea/Textarea';

describe('Textarea', () => {
  test('should render the Textarea component', () => {
    render(<Textarea label="Comments:" name="comments" value="this is a test comment..." className={null} onChange={vi.fn()} />);
  
    const textarea = screen.getByRole('textbox');
    
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('this is a test comment...');
  });
});