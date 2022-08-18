import 'dotenv/config';

export const API_PATHS = {
  notes: '/api/notes',
  contacts: '/api/contacts',
  search: '/api/search'
};

export const MONGO_URL = process.env.MONGO_URL;

export const PORT = process.env.PORT || 3000;

export default {
  API_PATHS,
  MONGO_URL,
  PORT
};
