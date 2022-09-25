
/**
 * Logger info message
 * @param  {...any} args
 */
export const info = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...args);
  }
};

/**
 * Logger error message
 * @param  {...any} args
 */
export const error = (...args) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...args);
  }
};

export default {
  error,
  info
};

