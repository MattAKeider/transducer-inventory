import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';

beforeEach(() => {
  // Test environment doesn't know where the modal is within index.html
  const modalEl = document.createElement('div');
  modalEl.setAttribute('id', 'modal');
  document.body.appendChild(modalEl);
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  document.body.querySelector('#modal').remove();
  cleanup();
});
