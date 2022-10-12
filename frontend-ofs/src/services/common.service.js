
export const isProd = () => process.env.NODE_ENV === 'production';
export const DB_ORIGIN = isProd() ? '' : 'http://localhost:3001';
export const DB_API_PATH = isProd() ? '/api' : '';
export const DB_BASE_URL = `${DB_ORIGIN}${DB_API_PATH}`;

export const _getData = (response) => {
  return isProd() 
    ? response.data.data
    : response.data;
}