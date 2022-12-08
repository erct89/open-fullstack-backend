import 'dotenv/config';

export const API_PATHS = {
  blogs: '/api/blogs',
  contacts: '/api/contacts',
  notes: '/api/notes',
  search: '/api/search',
  users: '/api/users',
  login: '/api/login'
};

export let MONGO_URL = process.env.MONGO_URL;
if (process.env.NODE_ENV === 'test') {
  MONGO_URL = process.env.TEST_MONGO_URL;
}

export const PORT = process.env.PORT || 3000;

export default {
  API_PATHS,
  MONGO_URL,
  PORT
};
