
/**
 * Get string and return reverse it.
 * @param {String} value
 * @returns {String}
 */
export const palindrome = value => {
  return ([...value]).reverse().join('');
};

/**
 * Get numbers and return averange it.
 * @param {...Number} params
 * @returns {Number}
 */
export const average = (...params) => {
  params = [...params];

  return params.length
    ? params.reduce((acc, item) => acc + item, 0) / params.length
    : 0;
};

export default {
  palindrome,
  average
};
