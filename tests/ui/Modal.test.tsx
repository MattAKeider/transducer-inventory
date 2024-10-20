import { render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

import Modal, { ModalHandle } from '../../src/ui/Modal/Modal';

const TestComponent = () => {
  const ref: React.MutableRefObject<ModalHandle> = React.createRef();

  useEffect(() => {
    ref.current.open();
  }, []);

  function handleClose() {
    ref.current.close();
  }

  return (
    <Modal ref={ref}>
      <>
        <h1>Testing Modal</h1>
        <button type="button" onClick={handleClose}>Close</button>
      </>
    </Modal>
  );
};

describe('Modal', () => {
  beforeAll(() => {
    // TODO: Remove once jsdom supports dialog method implementations
    HTMLDialogElement.prototype.showModal = vi.fn(function () {
      this.open = true;
    });
    
    HTMLDialogElement.prototype.close = vi.fn(function () {
      this.open = false;
    });
  });

  test('should show Modal component and then close after button clicked', async () => {
    render(<TestComponent />);

    const closeButton = screen.getByRole('button');
    const dialog = screen.getByRole('dialog');
    const heading = screen.getByRole('heading');

    expect(dialog).toBeVisible();
    expect(heading).toBeVisible();

    const user = userEvent.setup();
    await user.click(closeButton);

    expect(dialog).not.toBeVisible();
    expect(heading).not.toBeVisible();
  });
});