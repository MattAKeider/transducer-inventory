import { render, screen } from "@testing-library/react";

import Checkbox from "../../src/ui/Checkbox/Checkbox";

describe('Checkbox', () => {
  test('should render the Checkbox component', () => {
    render(<Checkbox label="Theme" name="theme" checked={false} className={null} onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });
});