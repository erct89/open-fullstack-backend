import Logger from '../utils/logger.js';

/**
 * request info
 * @param {Object} request
 * @param {Object} response
 * @param {Object} next
 */
export const requestLogger = (request, response, next) => {
  Logger.info('--- Request info ---');
  Logger.info('Method: ', request.method);
  Logger.info('Path: ', request.path);
  Logger.info('Body: ', request.body);
  Logger.info('--- ---');

  next();
};
