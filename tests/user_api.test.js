import bcrypt from 'bcrypt';
import supertest from 'supertest';
import Server from '../src/models/server.model.js';
import User from '../src/models/user.model.js';
import { initialBlogs } from './helpers/users.helpers';

describe('Suite User api', () => {
  let api;

  beforeAll(() => {
    const server = new Server();
    api = supertest(server);
  });

  beforeEach(async() => {
    await resetUser();
    await initialUser();
  });

  describe('POST /api/users', () => {

  });
});