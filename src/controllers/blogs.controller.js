import Blog from '../models/blog.model.js';
import Logger from '../utils/logger.js';

/**
 * Controller request to GET /blogs
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const getBlogs = async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json({ data: blogs });
  } catch (error) {
    Logger.error('[ERROR][GET] blogs');
    next(error);
  }
};

/**
 * Controller request to GET /blogs/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const getBlog = async (request, response) => {
  const { id } = request.params;

  const blog = await Blog.findById(id);

  if(!blog) {
    return response.status(404).json({ 'message': `Not found note ${id}` });
  }

  response.status(200).json({ data: blog });
};

/**
 * Controller request to POST /blogs
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const createBlog = async (request, response, next) => {
  const { title, author, url } = request.body;

  try {
    const blog = new Blog({ title, author, url });
    const newBlog = await blog.save();
    response.json({ data: newBlog });
  } catch (error) {
    Logger.error('[ERROR][POST] blog');
    next(error);
  }
};

/**
 * Controller request to PUT /blogs/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const updateBlog = async (request, response, next) => {
  const { id } = request.params;
  const { author, title, url, like } = request.body;

  try {
    const blogSrc = await Blog.findById(id);

    if (like) {
      blogSrc.likes += 1;
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { author, title, url, likes: blogSrc.likes },
      { new:true, runValidators: true }
    );

    response.json({ data: updateBlog });
  } catch (error) {
    Logger.error('[ERROR][PUT] Blog');
    next(error);
  }
};

/**
 * Controller request to PATCH /blogs/:id
 * @param {Object} request
 * @param {Object} response
 */
export const modifyBlog = (request, response) => {
  response.status(500).json({ error: 'Coming soon' });
};

/**
 * Controller request to DELETE /blogs/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const removeBlog = async (request, response, next) => {
  const { id } = request.params;

  try {
    const data = await Blog.findByIdAndRemove(id);

    response.json({ data });
  } catch (error) {
    Logger.error('[ERROR][DELETE] Blog');
    next(error);
  }
};

export default {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  modifyBlog,
  removeBlog
};