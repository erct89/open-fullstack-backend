import mongoose from 'mongoose';
import supertest from 'supertest';
import { getBlogs, getBlogTitle, resetBlogs, initialBlogs } from './helpers/blogs.helpers.js';
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
      const blogsUIDs = data.map(getBlogTitle).sort();
      const expectedBlogsUIDs = mocks.GET.RESPONSE_SUCESS.map(getBlogTitle).sort();

      expect(blogsUIDs).toEqual(expectedBlogsUIDs);
    });

    test('Should returned blogs has property uid', async() => {
      const response = await api.get(API_PATH)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const data = response.body.data;

      data.forEach(blog => {
        expect(blog.uid).toBeDefined();
      });
    });
  });

  describe('POST /api/blogs', () => {
    test('Should be return application/json', async() => {
      await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS)
        .expect(200)
        .expect('Content-Type', /application\/json/);
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

      const blogs = await getBlogs();
      const blogsIDs = blogs.map(blog => String(blog._id));

      expect(blogsIDs).toContain(newBlog.uid);
    });

    test('Should be the property "likes" to equal 0, when new blog is created without property "likes"', async() => {
      expect(mocks.POST.BODY_SUCESS.likes).toBeUndefined();

      const response = await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS);
      const newBlog = response.body.data;

      expect(newBlog.likes).toBe(0);
    });

    test('Should be return error, when body is empty', async() => {
      expect(mocks.POST.BODY_EMPTY).toEqual({});

      await api.post(API_PATH)
        .send(mocks.POST.BODY_EMPTY)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be return error, when body has not properties title or url', async() => {
      expect(mocks.POST.BODY_WITHOUT_TITLE.title).toBeUndefined();

      await api.post(API_PATH)
        .send(mocks.POST.BODY_WITHOUT_TITLE)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
