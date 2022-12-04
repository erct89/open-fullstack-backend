import bcrypt, { genSalt } from 'bcrypt';
import User from '../models/user.model.js';

export const getNotes = (request, response) => {};

export const createNote = async(request, response) => {
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

export const getUser = (request, response) => {};

export const updateUser = (request, response) => {};

export const modifyUser = (request, response) => {};

export const removeUser = (request, response) => {};

export default {
  getNotes,
  createNote,
  getUser,
  updateUser,
  modifyUser,
  removeUser
};
