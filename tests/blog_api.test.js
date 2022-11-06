import mongoose from 'mongoose';
import supertest from 'supertest';
import { getBlogs, resetBlogs, initialBlogs } from './helpers/blogs.helpers.js';
import Server from '../src/models/server.model.js';

import { mocks } from './mocks/blogs.mock.js';

describe('Suite blogs api', () => {
  const API_PATH = '/api/blogs';
  let api;

  beforeAll(() => {
    const server = new Server();
    api = supertest(server.app);
  });

  beforeEach(async() => {
    await resetBlogs();
    await initialBlogs();
  });

  describe('GET /api/blogs', () => {
    test('Should be return applicaiton/json', async () => {
      await api.get(API_PATH)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return all blogs', async() => {
      const response = await api.get(API_PATH)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const data = response.body.data;
      expect(data).toContainEqual(mocks.GET.RESPONSE_SUCESS);
    });
  });

  describe('POST /api/blogs', () => {
    test('Should be return application/json', async() => {
      await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS)
        .expect(200)
        .expect('Content-Type', /aplicaction\/json/);
    });

    test('Should be increment number of blogs, when create new blog', async() => {
      const firstBlogs = await getBlogs();

      await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS);

      const updateBlogs = await getBlogs();

      expect(updateBlogs).toHaveLength(firstBlogs.length + 1);
    });

    test('Should be exist new note, when create new blog', async() => {
      const response = await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS);

      const newBlog = response.body.data;

      const updatedBlogIDs = await getBlogs().map(blog => blog.uid);

      expect(updatedBlogIDs).toContain(newBlog.uid);
    });
    test('Should be return error, when body is empty', async() => {});
    test('Should be return error, when body has not all properties', async() => {});
  })

  afterAll(() => {
    mongoose.connection.close();
  });
});
