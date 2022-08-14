/**
 * 
 * @param {Object} error 
 * @param {Object} request 
 * @param {Object} response 
 * @param {Function} next 
 */
export const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === 'CastError') {
    response.status(400).json({ message: 'Malformatted id' });
  } 
  
  next(error);
};

export default errorHandler;