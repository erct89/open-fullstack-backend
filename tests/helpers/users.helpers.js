import bcrypt from 'bcrypt';
import User from '../../src/models/user.model.js';
import mock from '../mocks/users.mock.js';

export const createUser = async({ name, userName, password }) => {
  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  return new User({ name, userName, passwordHash });
};

export const reset = async() => await User.deleteMany({});

export const initialize = async() => await Promise.all(mock.DB_INTIALIZED.map(async(userItem) => {
  const user = await createUser(userItem)
  return await user.save();
}));

export const getAllUsers = async() => {
  const users = await User.find({});
  return users;
};

export default {
  reset,
  initialize,
  getAllUsers
};
