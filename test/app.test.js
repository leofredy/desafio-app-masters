import {
  test,
  expect,
  describe,
} from '@jest/globals';

import Supertest from 'supertest';
import Server from '../src/server.js';

describe('Test if API is online', () => {
  test('GET / - expect return { alive: true }', async () => {
    const response = await Supertest(Server).get('/');
    expect(JSON.parse(response.text)).toEqual(JSON.parse('{ "alive": true }'));
  });
});
