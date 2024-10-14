import { render, screen } from '@testing-library/react';

import Input from '../../src/ui/Input/Input';

describe('Input', () => {
  test('should render the Input component', () => {
    render(<Input label='Name:' name='name' value='Tester' className='null' onChange={vi.fn()} />);

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('Tester');
  });

  test('should contain child element', () => {
    render(
      <Input label='Name:' name='name' value='Tester' className='null' onChange={vi.fn()}>
        <p>This is a test error message!</p>
      </Input>);

    const paragraph = screen.getByText(/this is a test/i);

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(/this is a test error message!/i);
  });
});