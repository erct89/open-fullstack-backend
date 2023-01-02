import mongoose from 'mongoose';
import supertest from 'supertest';
import Server from '../src/models/server.model.js';
import mocks from './mocks/users.mock.js';
import helpers from './helpers/users.helpers';

describe('Suite User api', () => {
  const API_PATH = '/api/users';
  let api;

  beforeAll(async() => {
    const server = new Server();
    api = supertest(server.app);
  });

  beforeEach(async() => {
    await helpers.reset();
    await helpers.initialize();
  });

  describe('GET /api/users', () => {
    const mocks_GET = mocks.GET;

    test('Should be return application/json', async() => {
      await api.get(API_PATH)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return array of users', async() => {
      const MOCKS_USER_EMAILS = mocks_GET.RESPONSE.SUCESS.map(userItem => userItem.email).sort();
      const allUsers = await helpers.getAllUsers();
      const response = await api.get(API_PATH);

      let users = response.body.data;
      users = users.map(userItem => userItem.email);

      expect(users).toHaveLength(allUsers.length);
      MOCKS_USER_EMAILS.forEach(email => {
        expect(users).toContain(email);
      });
    });
  });

  describe('POST /api/users', () => {
    const mocks_POST = mocks.POST;

    test('Should be return application/json', async() => {
      await api.post(API_PATH)
        .send(mocks_POST.REQUEST.BODY.SUCESS)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be add new user in db', async() => {
      await helpers.deleteUser(mocks_POST.REQUEST.BODY.SUCESS);
      const response = await api.post(API_PATH)
        .send(mocks_POST.REQUEST.BODY.SUCESS)
        .expect(200);

      const newUser = response.body.data;
      delete newUser.uid;

      expect(newUser).toMatchObject(mocks_POST.RESPONSE.BODY.SUCESS);
    });

    test('Should be return error 400, when body request has not email property', async() => {
      const mocks_REQUEST_USER = mocks_POST.getUserWithout(mocks_POST.REQUEST.BODY.SUCESS, 'email');

      await api.post(API_PATH)
        .send(mocks_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has not name property', async() => {
      const mocks_REQUEST_USER = mocks_POST.getUserWithout(mocks_POST.REQUEST.BODY.SUCESS, 'name');

      await api.post(API_PATH)
        .send(mocks_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has not password property', async() => {
      const mocks_REQUEST_USER = mocks_POST.getUserWithout(mocks_POST.REQUEST.BODY.SUCESS, 'password');

      await api.post(API_PATH)
        .send(mocks_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has password property minor to 8 charactes', async() => {
      const mocks_REQUEST_USER = { ...mocks_POST.REQUEST.SUCESS, password: mocks_POST.REQUEST.BODY.SUCESS.password.slice(0,2) };

      await api.post(API_PATH)
        .send(mocks_REQUEST_USER)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error 400, when body request has duplicate email property', async() => {
      const DB_USERS = await helpers.getAllUsers();
      const DB_FIRST_USER = DB_USERS[0];
      const mocks_DUPLICATE_USER = { ...mocks_POST.REQUEST.SUCESS, email: DB_FIRST_USER.email };

      await api.post(API_PATH)
        .send(mocks_DUPLICATE_USER)
        .expect(400);
    });

    test('Should be return error 400, when body request has duplicate name property', async() => {
      const DB_USERS = await helpers.getAllUsers();
      const DB_FIRST_USER = DB_USERS[0];
      const mocks_DUPLICATE_USER = { ...mocks_POST.REQUEST.SUCESS, name: DB_FIRST_USER.name };

      await api.post(API_PATH)
        .send(mocks_DUPLICATE_USER)
        .expect(400);
    });
  });

  afterAll(async() => {
    await helpers.reset();
    mongoose.connection.close();
  });
});