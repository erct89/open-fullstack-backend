import Blog from '../models/blog.model.js';
import Logger from '../utils/logger.js';

/**
 * Controller request to GET /blogs
 * @param {Object} request
 * @param {Object} response
 */
export const getBlogs = async (request, response, next) => {
  try {
    const user = request.user;
    const blogs = await Blog.find({ user: user._id });

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
  const user = request.user;

  const blog = await Blog.findOne({ _id: id, user: user._id });

  if(!blog) {
    return response.status(404).json({ 'message': `Not found note ${id}` });
  }

  response.status(200).json({ data: blog });
};

/**
 * Controller request to POST /blogs
 * @param {Object} request
 * @param {Object} response
 */
export const createBlog = async (request, response) => {
  const user = request.user;
  const { title, author, url } = request.body;

  const blog = new Blog({ title, author, url, user: user._id });
  const newBlog = await blog.save();
  response.json({ data: newBlog });
};

/**
 * Controller request to PUT /blogs/:id
 * @param {Object} request
 * @param {Object} response
 */
export const updateBlog = async (request, response) => {
  const { id } = request.params;
  const { author, title, url, likes } = request.body;

  const blogSrc = await Blog.findById(id);

  if (!blogSrc) {
    return response.status(404).json({ 'message': `Not found note ${id}` });
  }

  if (likes) {
    blogSrc.likes += 1;
  }

  const updateBlog = await Blog.findByIdAndUpdate(
    id,
    { author, title, url, likes: blogSrc.likes },
    { new: true, runValidators: true }
  );

  response.status(200).json({ data: updateBlog });
};

/**
 * Controller request to PATCH /blogs/:id
 * @param {Object} request
 * @param {Object} response
 */
export const modifyBlog = async(request, response) => {
  const { id } = request.params;
  const { author, title, url, likes } = request.body;
  const findBlog = await Blog.findById(id);

  if (!findBlog) {
    response.status(404).json({ 'message': `Not found note ${id}` });
  }

  const updateData = JSON.parse(JSON.stringify({ author, title, url, likes }));

  if (likes < findBlog.likes) {
    updateData.likes = findBlog.likes - 1;
  } else if (likes > findBlog.likes) {
    updateData.likes = findBlog.likes + 1;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  );

  response.status(200).json({ data: updatedBlog });
};

/**
 * Controller request to DELETE /blogs/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const removeBlog = async (request, response) => {
  const { id } = request.params;
  const user = request.user;

  const data = await Blog.findByIdAndRemove(id, { user: user._id });

  if (!data) {
    response.status(404).json({ message: 'Not found' });
  }

  response.json({ data });
};

export default {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  modifyBlog,
  removeBlog
};