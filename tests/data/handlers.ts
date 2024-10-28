import { http, HttpResponse } from 'msw';

import { TRANSDUCER_RESPONSE } from './testData';

export const handlers = [
  http.get('http://localhost:5000/api/transducers', () => {
    return HttpResponse.json(TRANSDUCER_RESPONSE)
  })
];