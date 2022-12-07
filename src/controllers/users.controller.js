import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const getUsers = async(request, response) => {
  const allUsers = await User.find({})
    .populate('notes', { content: 1, date: 1 });

  response.json({ data: allUsers });
};

export const getUser = (request, response) => {};

export const createUser = async(request, response) => {
  const { name, userName, password } = request.body;

  if (!name || !userName || !password) {
    response.status(400).json({ 'message': 'Error to create user' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    userName,
    passwordHash
  });
  const userSaved = await user.save();

  response.json({ data: userSaved });
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
