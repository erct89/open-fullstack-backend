import mongoose from 'mongoose';
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
      const MOCKS_USER_EMAILS = MOCK_GET.RESPONSE.SUCESS.map(userItem => userItem.email).sort();
      const allUsers = await helpers.getAllUsers();
      const response = await api.get(API_PATH);

      let users = response.body.data;
      users = users.map(userItem => userItem.email);

      expect(users).toHaveLength(allUsers.length);
      expect(users.sort()).toEqual(MOCKS_USER_EMAILS);
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

    test('Should be return error 400, when body request has not email property', async() => {
      const MOCK_REQUEST_USER = MOCK_POST.getUserWithout(MOCK_POST.REQUEST.BODY.SUCESS, 'email');

      await api.post(API_PATH)
        .send(MOCK_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has not name property', async() => {
      const MOCK_REQUEST_USER = MOCK_POST.getUserWithout(MOCK_POST.REQUEST.BODY.SUCESS, 'name');

      await api.post(API_PATH)
        .send(MOCK_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has not password property', async() => {
      const MOCK_REQUEST_USER = MOCK_POST.getUserWithout(MOCK_POST.REQUEST.BODY.SUCESS, 'password');

      await api.post(API_PATH)
        .send(MOCK_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has password property minor to 8 charactes', async() => {
      const MOCK_REQUEST_USER = { ...MOCK_POST.REQUEST.SUCESS, password: MOCK_POST.REQUEST.BODY.SUCESS.password.slice(0,2) };

      await api.post(API_PATH)
        .send(MOCK_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has duplicate email property', async() => {
      const DB_USERS = await helpers.getAllUsers();
      const DB_FIRST_USER = DB_USERS[0];
      const MOCK_DUPLICATE_USER = { ...MOCK_POST.REQUEST.SUCESS, email: DB_FIRST_USER.email };

      await api.post(API_PATH)
        .send(MOCK_DUPLICATE_USER)
        .expect(400);
    });

    test('Should be return error 400, when body request has duplicate name property', async() => {
      const DB_USERS = await helpers.getAllUsers();
      const DB_FIRST_USER = DB_USERS[0];
      const MOCK_DUPLICATE_USER = { ...MOCK_POST.REQUEST.SUCESS, name: DB_FIRST_USER.name };

      await api.post(API_PATH)
        .send(MOCK_DUPLICATE_USER)
        .expect(400);
    });
  });

  afterAll(async() => {
    await helpers.reset();
    mongoose.connection.close();
  });
});