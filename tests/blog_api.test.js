import mongoose from 'mongoose';
import supertest from 'supertest';
import helpers from './helpers/blogs.helpers.js';
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
    await helpers.resetBlogs();
    await helpers.initialBlogs();
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
      const blogsUIDs = data.map(helpers.getBlogTitle).sort();
      const expectedBlogsUIDs = mocks.GET.RESPONSE_SUCESS.map(helpers.getBlogTitle).sort();

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
      const firstBlogs = await helpers.getBlogs();

      await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS);

      const updateBlogs = await helpers.getBlogs();

      expect(updateBlogs).toHaveLength(firstBlogs.length + 1);
    });

    test('Should be exist new note, when create new blog', async() => {
      const response = await api.post(API_PATH)
        .send(mocks.POST.BODY_SUCESS);

      const newBlog = response.body.data;

      const blogs = await helpers.getBlogs();
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
      expect(mocks.BODY_EMPTY).toEqual({});

      await api.post(API_PATH)
        .send(mocks.BODY_EMPTY)
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

  describe('GET /api/blogs/:id', () => {
    test('Should returned application/json', async() => {
      const randomBlog = await helpers.getExistRandomBlog();

      await api.get(`${API_PATH}/${randomBlog.uid}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should returned blog, when blog exist', async() => {
      const randomBlog = await helpers.getExistRandomBlog();
      delete randomBlog.create;

      const response = await api.get(`${API_PATH}/${randomBlog.uid}`);
      const blog = response.body.data;
      delete blog.create;

      expect(blog).toMatchObject(randomBlog);
    });

    test('Should returned error 404, when blog not exist', async() => {
      const randomBlog = await helpers.getUnexistRandomBlog();

      await api.get(`${API_PATH}/${randomBlog.uid}`)
        .expect(404);
    });
  });

  describe('PUT /api/blogs/:id', () => {
    test('Should returned application/json', async() => {
      const randomBlog = await helpers.getExistRandomBlog();

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PUT.BODY_SUCESS)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be modify blog, when request body is good', async() => {
      const randomBlog = await helpers.getExistRandomBlog();
      delete randomBlog.create;

      const response = await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PUT.BODY_SUCESS)
        .expect(200);

      const modifyBlog = response.body.data;
      delete modifyBlog.create;

      mocks.PUT.BODY_SUCESS.likes = randomBlog.likes + 1;

      expect(modifyBlog).toMatchObject(mocks.PUT.BODY_SUCESS);
    });

    test('Should return error 400, when body request not exist', async() => {
      const randomBlog = await helpers.getExistRandomBlog();
      delete randomBlog.create;

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.BODY_EMPTY)
        .expect(400);
    });

    test('Should return error 400, when body request has not all properties', async() => {
      const randomBlog = await helpers.getExistRandomBlog();
      delete randomBlog.create;

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PUT.BODY_WITHOUT_TITLE)
        .expect(400);
    });

    test('Should return error 404, when blog id not exits', async() => {
      const randomBlog = await helpers.getUnexistRandomBlog();

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PUT.BODY_SUCESS)
        .expect(404);
    });
  });

  describe('PATCH /api/blogs/:id', () => {
    test('Should returned application/json', async() => {
      const randomBlog = await helpers.getExistRandomBlog();

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PATCH.BODY_TITLE)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be modify blog, when request body is good', async() => {
      const randomBlog = await helpers.getExistRandomBlog();
      delete randomBlog.create;

      const response = await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PATCH.BODY_TITLE);
      const blog = response.body.data;
      delete blog.create;

      randomBlog.title = mocks.PATCH.BODY_TITLE.title;

      expect(blog).toMatchObject(randomBlog);
    });

    test('Should return error 400, when body request not exist', async() => {
      const randomBlog = await helpers.getExistRandomBlog();

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.BODY_EMPTY)
        .expect(400);
    });

    test('Should return error 400, when body request has not all mandatory properties', async() => {
      const randomBlog = await helpers.getExistRandomBlog();

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.BODY_EMPTY)
        .expect(400);
    });

    test('Should return error 404, when blog id not exits', async() => {
      const randomBlog = await helpers.getUnexistRandomBlog();
      delete randomBlog.create;

      await api.put(`${API_PATH}/${randomBlog.uid}`)
        .send(mocks.PATCH.BODY_RANDOM)
        .expect(400);
    });
  });

  describe('DELETE /api/blogs/:id', () => {
    test('Should returned application/json', async() => {});
    test('Should returned blog, when blog exist', async() => {});
    test('Should returned error 404, when blog not exist', async() => {});
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
