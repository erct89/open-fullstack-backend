
/**
 * Logger info message
 * @param  {...any} args
 */
export const info = (...args) => {
  console.log(...args);
};

/**
 * Logger error message
 * @param  {...any} args
 */
export const error = (...args) => {
  console.error(...args);
};

export default {
  error,
  info
};

