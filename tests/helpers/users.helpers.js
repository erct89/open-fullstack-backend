import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../src/models/user.model.js';
import mocks from '../mocks/users.mock.js';

export const generateToken = user => jwt.sign({ email: user.email, id: user._id }, process.env.SECRET);

export const createUser = async({ name, email, password }) => {
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  return new User({ name, email, passwordHash });
};

export const getUser = async(email) => await User.findOne({ email });

export const reset = async() => await User.deleteMany({});

export const initialize = async() => await Promise.all(mocks.DB_INTIALIZED.map(async(userItem) => {
  const user = await createUser(userItem);
  return await user.save();
}));

export const getAllUsers = async() => {
  const users = await User.find({});
  return users;
};

export default {
  createUser,
  generateToken,
  getAllUsers,
  initialize,
  reset
};
