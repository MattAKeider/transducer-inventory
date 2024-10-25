import { http, HttpResponse } from 'msw';

import { TRANSDUCERS } from './testData';

export const handlers = [
  http.get('/transducers', () => {
    return HttpResponse.json(TRANSDUCERS);
  })
];