import { render, screen } from "@testing-library/react";

import Button from "../../src/ui/Button/Button";

describe('Button', () => {
  test('should render Button', () => {
    render(<Button>Click</Button>);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click');
  });
});