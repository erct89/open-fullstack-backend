import supertest from 'supertest';
import Server from '../src/models/server.model.js';
import mock from './mocks/users.mock.js';
import helpers from './helpers/users.helpers';

describe('Suite User api', () => {
  const API_PATH = '/api/users';
  let api;

  beforeAll(() => {
    const server = new Server();
    api = supertest(server.app);
  });

  beforeEach(async() => {
    await helpers.reset();
    await helpers.initialize();
  });

  describe('GET /api/users', () => {
    const MOCK_GET = mock.GET;

    test('Should be return application/json', async() => {
      await api.get(API_PATH)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return array of users', async() => {
      const allUsers = await helpers.getAllUsers();
      const response = await api.get(API_PATH);

      const users = response.body.data;

      users.forEach(userItem => delete userItem.uid);

      expect(users).toHaveLength(allUsers.length);
      expect(users.sort()).toEqual(MOCK_GET.RESPONSE.SUCESS.sort());
    });
  });

  describe('POST /api/users', () => {
    const MOCK_POST = mock.POST;

    test('Should be return application/json', async() => {
      await api.post(API_PATH)
        .send(MOCK_POST.REQUEST.BODY.SUCESS)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be add new user in db', async() => {
      const response = await api.post(API_PATH)
        .send(MOCK_POST.REQUEST.BODY.SUCESS);

      const newUser = response.body.data;
      delete newUser.uid;

      expect(newUser).toMatchObject(MOCK_POST.RESPONSE.BODY.SUCESS);
    });

    //TODO:
  });
});