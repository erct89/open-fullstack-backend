import Blog from '../../src/models/blog.model.js';
import mocks from '../mocks/blogs.mock.js';

export const resetBlogs = async() => await Blog.deleteMany();

export const initialBlogs = async() => await Promise.all(mocks.INITIAL_BLOGS.map(data => (new Blog(data)).save());

export default {
  resetBlogs,
  initialBlogs
};
