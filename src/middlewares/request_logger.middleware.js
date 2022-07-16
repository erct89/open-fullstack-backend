
/**
 * request info
 * @param {Object} request 
 * @param {Object} response 
 * @param {Object} next 
 */
export const requestLogger = (request, response, next) => {
  console.log('--- Request info ---');
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  console.log('--- ---');

  next();
}
