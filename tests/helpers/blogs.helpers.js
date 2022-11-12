import { Blog } from '../../src/models/blog.model.js';
import mocks from '../mocks/blogs.mock.js';

export const getBlogs = async() => {
  const blogs = await Blog.find({});
  return blogs;
};

export const initialBlogs = async() =>
  await Promise.all(mocks.INITIAL_BLOGS.map(async(data) => (new Blog(data)).save()));

export const resetBlogs = async() =>
  await Blog.deleteMany();

export const getBlogTitle = ({ title }) => title;

export const getExistRandomBlog = async() => {
  const blogs = await getBlogs();
  const selectedRandomBlog = blogs[Math.floor(Math.random() * blogs.length )];

  return selectedRandomBlog.toJSON();
};

export const getUnexistRandomBlog = async() => {
  const blog = new Blog(mocks.FAKE_BLOG);
  await blog.save();
  await blog.remove();

  return blog.toJSON();
};

export default {
  getBlogs,
  getBlogTitle,
  getExistRandomBlog,
  getUnexistRandomBlog,
  initialBlogs,
  resetBlogs
};
