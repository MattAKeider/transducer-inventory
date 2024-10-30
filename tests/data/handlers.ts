import { http, HttpResponse } from 'msw';

import { TRANSDUCERS } from './testData';

export const handlers = [
  http.get('http://localhost:5000/api/transducers', () => {
    return HttpResponse.json(TRANSDUCERS)
  })
];