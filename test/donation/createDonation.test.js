import {
  test,
  expect,
  describe,
  beforeAll,
  afterAll,
} from '@jest/globals';

import Supertest from 'supertest';
import casesBlankFields from './casesBlankFields.js';
import caseDeviceCountDevice from './caseDeviceCountDevice.js';
import caseDeviceFields from './caseDeviceFields.js';

import Server from '../../src/server.js';
import dataSource from '../../src/database/ormconfig.js';

let connection;

// Cria uma conexão com o banco em cada teste.
beforeAll(async () => {
  connection = await dataSource.initialize();
  return connection;
});

// Exclui a conexão com o banco a cada teste.
afterAll(() => connection.destroy());

describe('Tests blank fields', () => {
  for (let indexCase = 0; indexCase < casesBlankFields.length; indexCase += 1) {
    test(`${casesBlankFields[indexCase].fieldTest} field is empty I expect status code 400`, async () => {
      const response = await Supertest(Server).post('/donation').send(casesBlankFields[indexCase].data);

      expect(response.statusCode).toEqual(400);
      expect(Object.prototype.hasOwnProperty.call(response.body, 'errorMessage')).toEqual(true);
    });
  }
});

describe('Test email field', () => {
  test('Test invalid email', async () => {
    const response = await Supertest(Server)
      .post('/donation')
      .send(
        {
          name: 'Any Any',
          email: 'any@.com',
          phone: '99999999999',
          zip: '99999999',
          city: 'any city',
          state: 'AA',
          streetAddress: 'R. Any',
          number: '999',
          complement: '',
          neighborhood: 'sim',
          deviceCount: 1,
          devices: [
            {
              type: 'notebook',
              condition: 'working',
            },
          ],
        },
      );

    expect(response.statusCode).toEqual(400);
    expect(response.body.errorMessage).toEqual('O campo email é opcional, mas se informado deve ser um email válido');
  });

  test('Test valid email: example@example.com', async () => {
    const response = await Supertest(Server)
      .post('/donation')
      .send(
        {
          name: 'Any Any',
          email: 'any@any.com',
          phone: '99999999999',
          zip: '99999999',
          city: 'any city',
          state: 'AA',
          streetAddress: 'R. Any',
          number: '999',
          complement: '',
          neighborhood: 'sim',
          deviceCount: 1,
          devices: [
            {
              type: 'notebook',
              condition: 'working',
            },
          ],
        },
      );

    expect(response.statusCode).toEqual(200);
    expect(Object.prototype.hasOwnProperty.call(response.body, 'success')).toEqual(true);
  });
});

describe('Test deviceCount and device', () => {
  test('Test different deviceCount and device', async () => {
    const response = await Supertest(Server)
      .post('/donation')
      .send(caseDeviceCountDevice[0]);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual(true);
    expect(response.body.errorMessage).toEqual('A quantidade de equipamentos 1 não está de acordo com as informações de equipamentos enviados 2');
  });

  test('Test deviceCount and device equal', async () => {
    const response = await Supertest(Server)
      .post('/donation')
      .send(caseDeviceCountDevice[1]);

    expect(response.statusCode).toEqual(200);
    expect(Object.prototype.hasOwnProperty.call(response.body, 'success')).toEqual(true);
  });
});

describe('Test device with invalid fields', () => {
  test('Test device invalid type field', async () => {
    const response = await Supertest(Server)
      .post('/donation')
      .send(caseDeviceFields[0]);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual(true);
    expect(response.body.errorMessage).toEqual('Todos os campos de device devem ser informados corretamente');
  });

  test('Test device invalid condition field', async () => {
    const response = await Supertest(Server)
      .post('/donation')
      .send(caseDeviceFields[1]);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual(true);
    expect(response.body.errorMessage).toEqual('Todos os campos de device devem ser informados corretamente');
  });
});
