import { http, HttpResponse } from 'msw';

import { CONDITIONS, TRANSDUCERS, USER } from './testData';

export const handlers = [
  http.get('http://localhost:5000/api/transducers', () => {
    return HttpResponse.json(TRANSDUCERS)
  }),
  http.post('http://localhost:5000/api/users/signup', () => {
    return HttpResponse.json(USER);
  }),
  http.post('http://localhost:5000/api/users/login', () => {
    return HttpResponse.json(USER);
  }),
  http.delete('http://localhost:5000/api/transducers/*', () => {
    return HttpResponse.json({ message: "Deleted!" });
  }),
  http.get('http://localhost:5000/api/conditions/*', () => {
    return HttpResponse.json(CONDITIONS);
  })
];