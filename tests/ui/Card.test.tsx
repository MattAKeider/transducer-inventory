import { render, screen } from "@testing-library/react";

import Card from "../../src/ui/Card/Card";

describe('Card', () => {
  test('should render Card component', () => {
    render(
      <Card>
        <h1>Testing</h1>
      </Card>
    );

    const heading = screen.getByRole('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/testing/i);
  });
});