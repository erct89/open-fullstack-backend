/**
 *
 * @param {Object} error
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ message: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: '401', data: { message: 'Invalid token' } });
  }

  next(error);
};

export default errorHandler;