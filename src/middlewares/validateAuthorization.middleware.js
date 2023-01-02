import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

/**
 * Get header authorization
 * @param {Object} request
 * @returns {Object|null}
 */
const getTokenFrom = request => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }

  return null;
};

/**
 * Validate if authorization token is success
 * @param {Request} request
 * @param {Response} response
 * @param {Funcion} next
 */
export const validateAuthorization = async (request, response, next) => {
  const token = getTokenFrom(request);
  const decoderToken = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decoderToken.id);

  if (!token && !user) {
    return response.status(401).json({ error: '401', data: { message: 'Unauthorized, missing token or invalid' } });
  }

  request.user = user;

  next();
};

export default validateAuthorization;