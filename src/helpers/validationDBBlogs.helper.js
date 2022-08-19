import Blog from '../models/blog.model.js';

export const validateUniqueURL = async (url) => {
  const findedBlog = await Blog.find({ url });

  if (findedBlog.length) {
    throw new Error('Blog exist');
  }

  return false;
};

export default {
  validateUniqueURL
};