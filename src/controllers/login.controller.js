import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

/**
 * User Loggin.
 * [POST] /login
 * @param {Object} request
 * @param {Object} response
 */
export const login = async(request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, user?.passwordHash);

  if (!isPasswordCorrect) {
    return response.status(401).json({ error: '401', data: { message: 'Invalid user or password'} });
  }

  const userToken = {
    email: user.email,
    id: user._id
  };
  const token = jwt.sign(userToken, process.env.SECRET);

  response.status(200).json({ data: { token, email: user.email, name: user.name } });
};

export default {
  login
};