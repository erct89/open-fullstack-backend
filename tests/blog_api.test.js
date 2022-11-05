import mongoose from 'mongoose';
import supertest from 'supertest';
import Server from '../src/models/server.model.js';
import { resetBlogs, initialBlogs } from './helpers/blogs.helpers.js':

import mocks from './mocks/blogs.mock.js';

describe('Suite blogs api', () => {
  let api;

  beforeAll(() => {
    const server = new Server();
    api = supertest(server.app);
  });

  beforeEach(async() => {
    await resetBlogs();
    await initialBlogs();
  });

  describe('GET api/notes', () => {

    test('Should be return applicaiton/json', async () => {
      await api.get('api/blogs')
        .expect(200)
        .expect(/application\/json/);
    });

    test('Should be return all blogs', async () => {
      const allBlogs = await getAllBlogs();
      
      const response = await api.get('api/blogs')
        .expect(200)
        .expect(/application\/json/);

      const data = response.body.data;
      expect(data).toContainEqual(allBlogs);
    });
  
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});