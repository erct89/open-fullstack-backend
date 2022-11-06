import { Blog } from '../../src/models/blog.model.js';
import mocks from '../mocks/blogs.mock.js';

export const getBlogs = async() => {
  const blogs = await Blog.find({});
  return blogs;
};

export const initialBlogs = async() => await Promise.all(mocks.INITIAL_BLOGS.map(async(data) => (new Blog(data)).save()));

export const resetBlogs = async() => await Blog.deleteMany();

export default {
  getBlogs,
  initialBlogs,
  resetBlogs
};
