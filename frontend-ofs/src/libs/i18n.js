export const translate = (literals) => (path, valueDefault) => {
  const pathSplitting = path.split('.');
  
  try {
    return pathSplitting.reduce((acc, newPath) => {
        return acc[newPath];
    }, literals);
  } catch {
    return valueDefault || path;
  }
};