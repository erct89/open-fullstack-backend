
/**
 * Middleware to handle unknown request
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const requestUnknown = (request, response, next) => {
  response.status(404).json({ error: 'Unknown endpoind', message: 'unknown endpoind.' });
  next();
};
