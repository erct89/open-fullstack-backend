import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

/**
 * Get all users
 * [GET] /api/users
 * @param {Object} request
 * @param {Object} response
 */
export const getUsers = async(request, response) => {
  const allUsers = await User.find({})
    .populate(['notes', 'blogs']);

  response.json({ data: allUsers });
};

export const getUser = (request, response) => {};

/**
 * Create user
 * [POST] /api/users
 * @param {Object} request
 * @param {Object} response
 */
export const createUser = async(request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    response.status(400).json({ 'message': 'Error to create user' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    passwordHash
  });
  const userSaved = await user.save();

  response.status(200).json({ data: userSaved });
};

export const updateUser = (request, response) => {};

export const modifyUser = (request, response) => {};

export const removeUser = (request, response) => {};

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  modifyUser,
  removeUser
};
